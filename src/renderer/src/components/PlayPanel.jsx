import { useEffect, useState } from 'react'
import { primaryButton, textButton } from '../styles.js'

export default function PlayPanel() {
  const [fivem, setFivem] = useState('checking') // checking | yes | no
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    window.launcher.game.isFivemInstalled().then((ok) => setFivem(ok ? 'yes' : 'no'))
  }, [])

  async function play() {
    setBusy(true)
    setError('')
    try {
      await window.launcher.game.play()
    } catch {
      setError("FiveMi käivitamine ebaõnnestus.")
    } finally {
      setBusy(false)
    }
  }

  const errorMessage = error && (
    <p role="alert" className="text-sm text-bad">
      {error}
    </p>
  )

  if (fivem === 'no') {
    return (
      <div className="flex flex-col gap-3">
        <p className="text-sm text-red-700">VIGA! Teil pole FiveMi versioon allalaetud! </p>
        <button type="button" onClick={() => window.launcher.game.installFivem()} className={primaryButton}>
          Lae FiveM.exe siit alla!
        </button>
        <button type="button" onClick={play} disabled={busy} className={textButton}>
          On juba olemas? Alusta mängimist
        </button>
        {errorMessage}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <button type="button" onClick={play} disabled={busy || fivem === 'checking'} className={primaryButton}>
        {busy ? 'Käivitame rollimängu süsteemi…' : 'Mängi'}
      </button>
      {errorMessage}
    </div>
  )
}
