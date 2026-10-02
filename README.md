# FiveM rollimängu serveri eraldatud launcher

> ⚠️ **Staatus:** arendusfaasis (WIP). Funktsioonid, API-d ja seadistus võivad muutuda ilma ette teatamata.

Kompaktne klientide platvorm FiveM rollimängu serverite loojatele ja arendajatele, kus mängijad saavad ühes kohas vaadata serveri rollimänguga seotud infot (nt reeglid, tegelased, fraktsioonid, uudised, olukorrad ja sündmused).

---

## Sisukord

1. [Ülevaade](#ülevaade)
2. [Kellele see on mõeldud](#kellele-see-on-mõeldud)
3. [Funktsioonid](#funktsioonid)
4. [Paigaldus](#paigaldus)
5. [Turvalisus ja läbipaistvus](#turvalisus-ja-läbipaistvus)
6. [Keelatud kasutus](#keelatud-kasutus)
7. [Väärkasutuse tagajärjed](#väärkasutuse-tagajärjed)
8. [Pahavarast teavitamine](#pahavarast-teavitamine)
9. [Vastutuse välistamine](#vastutuse-välistamine)
10. [Litsents ja kontakt](#litsents-ja-kontakt)

---

## Ülevaade

Launcher on eraldiseisev rakendus, mis töötab serveri kogukonna "esiukse" ja infokeskusena. Selle eesmärk on:

- koondada serveri rollimänguinfo ühte kohta;
- lihtsustada uute mängijate sisseelamist;
- anda serveri meeskonnale oma brändi ja sisuga klient ehk nõ Client Interface.

Programm **ei muuda mängufaile, ei süstita mängu protsessi ega kogu andmeid ilma mängija teadmata**.

## Kellele see on mõeldud

Programmi lähtekoodi võivad kasutada FiveM serverite **loojad ja arendajad**, kes ehitavad oma kogukonnale klienditeenust. Lõppkasutajad (mängijad) saavad kasutada ainult nende serveri omanike poolt levitatud ametlikke versioone.

## Funktsioonid

> Loend täieneb arenduse käigus. Kohandage vastavalt projekti tegelikule seisule.

- [ ] Serveri info ja uudised
- [ ] Rollimängu olukordade / sündmuste vaade
- [ ] Reeglid ja juhendid
- [ ] Serveri staatus ja ühendamine
- [ ] Kohandatav kujundus (bränd, logo, värvid)

## Paigaldus

```bash
# 1. Klooni repositoorium
git clone gh repo clone NoCapScripts-FiveM/fivem-launcher
cd fivem-launcher

# 2. Paigalda sõltuvused
yarn

# 3. Käivita arendusrežiimis
yarn dev
```

Kasuta alati ainult **ametlikku allikat** (see repositoorium / ametlikud release'id). Kolmandatelt osapooltelt saadud ehitusi **ära kasuta**.

## Turvalisus ja läbipaistvus

Projekti põhimõtted:

- Lähtekood on ülevaadatav ja muudatused jälgitavad.
- Launcher ei küsi ega salvesta mängija paroole, makseandmeid ega Discordi/Steami sessioonimärke.
- Võrgupäringud tehakse ainult dokumenteeritud serveri lõpp-punktidele.
- Kõik ametlikud väljalasked on allkirjastatud / varustatud kontrollsummaga (`SHA-256`), mis avaldatakse release'i lehel.
- Uuendused tulevad ainult ametlikust kanalist.

**Mängijana kontrolli enne käivitamist:** kas fail pärineb ametlikust allikast ja kas kontrollsumma klapib.

## Keelatud kasutus

Selle programmi koodi, ehitusi ega infrastruktuuri **on rangelt keelatud** kasutada, muuta või levitada järgmisel eesmärgil:

- pahavara (malware), viirused, ussid, troojalased, ransomware, spyware, keyloggerid, RAT-id;
- paroolide, sessioonimärkide, küpsiste, Discordi tokenite või muude isikuandmete varastamine;
- kasutaja arvuti varjatud kontroll, kaugjuurdepääs, krüptomiinimine või botnetti kaasamine;
- ründekoodi, exploit'ide või lisamoodulite varjatud laadimine kasutaja süsteemi;
- ametliku launcheri jäljendamine (phishing / võltsversioonid) kasutajate eksitamiseks;
- kasutajate jälgimine ilma selge teavituse ja nõusolekuta;
- tehnilise taristu (serverid, uuendusekanalid) kasutamine kahjuliku sisu jaotamiseks;
- muu tegevus, mis rikub kehtivaid seadusi.

## Väärkasutuse tagajärjed

Kui programmi kasutatakse pahavarana või muul keelatud viisil, kohaldub vähemalt järgmine:

### 1. Litsentsi ja õiguste lõppemine
- Kasutusõigus lõpeb **viivitamatult ja hoiatuseta**.
- Autoritel on õigus keelata ligipääs repositooriumile, release'idele ja uuendustele.

### 2. Platvormide ja teenuseosutajate meetmed
- Teavitame väärkasutusest: GitHub / hostingupakkujad, domeeniregistripidajad, Cfx.re (FiveM), Discord ja viirusetõrjefirmad.
- Tagajärjeks võivad olla konto sulgemised, serveri keelustamine, domeeni peatamine ja kahjuliku faili märkimine viirusetõrjete andmebaasides.

### 3. Kriminaal- ja tsiviilvastutus
Pahavara loomine, levitamine ja kasutamine on enamikus riikides kuritegu. Eestis ja Euroopa Liidus kehtivad muu hulgas:

- **Eesti karistusseadustik** (sh arvutisüsteemi ebaseaduslik kasutamine, andmete kahjustamine, arvutikelmus ja kuritegelik kasutus);
- **EL direktiiv 2013/40/EL** infosüsteemide vastaste rünnakute kohta;
- **Budapesti küberkuriteo konventsioon**;
- **Isikuandmete kaitse üldmäärus (GDPR)**: ebaseadusliku andmetöötluse eest võivad olla trahvid kuni 20 miljonit eurot või 4% ülemaailmsest aastakäibest.

Võimalikud tagajärjed: rahaline karistus, vangistus, kahju hüvitamise nõuded kannatanutele, riiklik rahvusvaheline uurimine ja digitaalsete seadmete konfiskeerimine.

### 4. Rollimängu kogukonna tagajärjed
- Püsiv väljaarvamine serveritest ja kogukondadest.
- Avalik hoiatus teistele serveriomanikele.
- Arendaja maine ja töövõimalused kannatavad pöördumatult.

### 5. Autorite vastutus
Autorid **ei vastuta** kolmandate isikute poolt tehtud muudatuste ega väärkasutuse eest. Kõik kahjud ja kohustused jäävad väärkasutajale.

## Pahavarast teavitamine

Kui kahtlustad, et kuskil levib selle projekti nime all kahjulikku koodi või võltsversiooni:

1. **Ära käivita** faili ega jaga seda edasi.
2. Teata sellest kontaktil `<TURVA_E-POST>` (lisa link, failinimi, kontrollsumma).
3. Kui oled juba käivitanud: katkesta internetiühendus, muuda paroolid teisest seadmest, lülita sisse 2FA ja tee täielik viirusekontroll.
4. Eestis võid pöörduda ka **CERT-EE** poole (cert.ee) või politsei poole.

Turvaprobleemide **vastutustundlik avalikustamine** on teretulnud, anna meile mõistlik aeg parandamiseks enne avalikustamist.

## Vastutuse välistamine

Tarkvara antakse kasutada **"nagu on" (as is)**, ilma mingi garantiita. Autorid ei vastuta otseste ega kaudsete kahjude eest, mis tulenevad programmi kasutamisest või väärkasutamisest. See dokument ei ole juriidiline nõu; õigusliku seisukoha saamiseks pöördu advokaadi poole.

Projekt ei ole seotud ega heaks kiidetud Rockstar Games, Take-Two Interactive ega Cfx.re poolt. *FiveM*, *GTA V* jt nimed kuuluvad nende omanikele.

## Litsents ja kontakt

- **Litsents:** `GPL-3.0` (nt MIT / GPL-3.0 / oma tingimused, väärkasutuse keeld peaks olema ka litsentsitekstis)
- **Autor / meeskond:** `NoCapScripts`
- **Üldine kontakt:** `Discord`
