

$ErrorActionPreference = 'Stop'

$Years   = 3
$OutDir  = if ($PSScriptRoot) { $PSScriptRoot } else { (Get-Location).Path }
$PfxPath = Join-Path $OutDir 'Cert.pfx'
$CerPath = Join-Path $OutDir 'Cert.cer'

function ConvertTo-PlainText([securestring]$Secure) {
    $bstr = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($Secure)
    try { [Runtime.InteropServices.Marshal]::PtrToStringBSTR($bstr) }
    finally { [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($bstr) }
}

function Ask-YesNo([string]$Question, [bool]$Default = $false) {
    $hint = if ($Default) { '[Y/n]' } else { '[y/N]' }
    $answer = (Read-Host "$Question $hint").Trim()
    if ($answer -eq '') { return $Default }
    return ($answer -match '^(y|yes)$')
}

try {
    Write-Host ''
    Write-Host 'Cert creator' -ForegroundColor Cyan
    Write-Host ''

    $name = (Read-Host 'Publisher name (press Enter for "Name")').Trim()
    if ($name -eq '') { $name = 'Name' }
    if ($name -match '[,+="\\<>#;]') {
        throw 'The publisher name can not contain these characters: , + = " \ < > # ;'
    }

    if ((Test-Path $PfxPath) -or (Test-Path $CerPath)) {
        if (-not (Ask-YesNo 'Cert.pfx or Cert.cer already exists here. Replace them?')) {
            Write-Host 'Cancelled. Nothing was changed.'
            return
        }
    }

    do {
        $password = Read-Host 'Choose a password for the certificate file' -AsSecureString
        $confirm  = Read-Host 'Type the password again' -AsSecureString
        $plain    = ConvertTo-PlainText $password
        $plain2   = ConvertTo-PlainText $confirm

        if ($plain -notmatch '^[A-Za-z0-9]{8,}$') {
            Write-Host 'Use at least 8 letters and numbers, with no spaces or symbols.' -ForegroundColor Yellow
            $ok = $false
        }
        elseif ($plain -ne $plain2) {
            Write-Host "The passwords don't match. Try again." -ForegroundColor Yellow
            $ok = $false
        }
        else {
            $ok = $true
        }
    } until ($ok)
    $plain2 = $null

    Write-Host ''
    Write-Host 'Creating certificate...'
    $cert = New-SelfSignedCertificate `
        -Type CodeSigningCert `
        -Subject "CN=$name" `
        -CertStoreLocation Cert:\CurrentUser\My `
        -KeyAlgorithm RSA -KeyLength 3072 -HashAlgorithm SHA256 `
        -NotAfter (Get-Date).AddYears($Years)

    Export-PfxCertificate -Cert $cert -FilePath $PfxPath -Password $password -Force | Out-Null
    Export-Certificate    -Cert $cert -FilePath $CerPath -Force | Out-Null

    Get-PfxData -FilePath $PfxPath -Password $password | Out-Null

    Write-Host ''
    Write-Host 'Done.' -ForegroundColor Green
    Write-Host "  Publisher name : $name"
    Write-Host "  Valid until    : $($cert.NotAfter.ToString('yyyy-MM-dd'))"
    Write-Host "  Private file   : $PfxPath"
    Write-Host "  Public file    : $CerPath"

    Write-Host ''
    if (Ask-YesNo 'Trust this certificate on this PC, so your own installers show the publisher name? (needs Administrator)') {
        $identity = [Security.Principal.WindowsIdentity]::GetCurrent()
        $isAdmin  = ([Security.Principal.WindowsPrincipal]$identity).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
        if ($isAdmin) {
            Import-Certificate -FilePath $CerPath -CertStoreLocation Cert:\LocalMachine\Root | Out-Null
            Import-Certificate -FilePath $CerPath -CertStoreLocation Cert:\LocalMachine\TrustedPublisher | Out-Null
            Write-Host 'Trusted on this PC.' -ForegroundColor Green
        }
        else {
            Write-Host 'This window is not running as Administrator, so that step was skipped.' -ForegroundColor Yellow
            Write-Host 'Open PowerShell as Administrator and run:'
            Write-Host "  Import-Certificate -FilePath '$CerPath' -CertStoreLocation Cert:\LocalMachine\Root"
            Write-Host "  Import-Certificate -FilePath '$CerPath' -CertStoreLocation Cert:\LocalMachine\TrustedPublisher"
        }
    }

    Write-Host ''
    if (Ask-YesNo 'Set the signing password in this PowerShell window, so "npm run dist" can use it?' $true) {
        $env:WIN_CSC_KEY_PASSWORD = $plain
        Write-Host 'Password set for this window only. If you close the window, set it again.'
    }
    $plain = $null

    $gitignore = Join-Path $OutDir '.gitignore'
    if ((Test-Path $gitignore) -and -not (Select-String -Path $gitignore -Pattern '\.pfx' -Quiet)) {
        if (Ask-YesNo 'Add *.pfx to .gitignore so the private file is never uploaded?' $true) {
            Add-Content -Path $gitignore -Value "`n*.pfx"
            Write-Host 'Added *.pfx to .gitignore.'
        }
    }

    Write-Host ''
    Write-Host 'Next steps' -ForegroundColor Cyan
    Write-Host '  1. In electron-builder.yml, set the publisher name exactly like this:'
    Write-Host '       win:'
    Write-Host '         signtoolOptions:'
    Write-Host '           certificateFile: ./Cert.pfx'
    Write-Host "           publisherName: $name"
    Write-Host '  2. Build in this same window:  npm run dist'
    Write-Host '  3. Never share or upload Cert.pfx.'
    Write-Host ''
}
catch {
    Write-Host ''
    Write-Host "Something went wrong: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
