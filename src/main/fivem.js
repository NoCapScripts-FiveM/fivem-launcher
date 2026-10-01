// Töötab Electroni main protsessis, seal puudub brauseri CORS piirang.
import { SERVER_ADDRESS, PATCHES_URL } from '../shared/config.mjs'

const HEADERS = { 'User-Agent': 'Mozilla/5.0 (compatible; LNRP-Launcher/1.0)', Accept: 'application/json' }
let serverBase = null // nt "http://1.2.3.4:30120"

// SERVER_ADDRESS: "ip:port", cfx.re/join/kood või täis URL
async function resolveBase() {
  const target = SERVER_ADDRESS.trim()
  const isJoinLink = /cfx\.re\/join\//i.test(target)

  if (!isJoinLink && /^https?:\/\//i.test(target)) return target.replace(/\/+$/, '')
  if (!isJoinLink && target.includes(':')) return `http://${target}`

  const code = target.match(/([a-z0-9]+)\/?$/i)?.[1]
  const res = await fetch(`https://cfx.re/join/${code}`, { signal: AbortSignal.timeout(8000), headers: HEADERS })
  const address = res.headers.get('x-citizenfx-url')
  if (!address) throw new Error(`Cfx.re ei andnud aadressi koodile "${code}"`)
  return address.replace(/\/+$/, '')
}

async function getJson(url) {
  const res = await fetch(url, { signal: AbortSignal.timeout(6000), headers: HEADERS })
  if (!res.ok) throw new Error(`${url} vastas staatusega ${res.status}`)
  return res.json()
}

async function readStatus() {
  serverBase ??= await resolveBase()
  const [info, players] = await Promise.all([getJson(`${serverBase}/info.json`), getJson(`${serverBase}/players.json`)])
  return {
    online: true,
    players: Array.isArray(players) ? players.length : 0,
    maxPlayers: Number(info?.vars?.sv_maxClients) || 0
  }
}

let cache = { at: 0, value: { online: false } }

// Mängijate arv, vahemälus 15 sekundit
export async function getServerStatus() {
  if (Date.now() - cache.at < 15_000) return cache.value
  let value
  try {
    try {
      value = await readStatus()
    } catch {
      serverBase = null // aadress võis muutuda, otsime uuesti
      value = await readStatus()
    }
  } catch (err) {
    console.error('Serveri kontroll ebaõnnestus:', err.message)
    value = { online: false }
  }
  cache = { at: Date.now(), value }
  return value
}

// Uuendused UCP API-st
export const getPatches = () => getJson(PATCHES_URL)
