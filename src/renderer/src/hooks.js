import { useEffect, useState } from 'react'
import { getServerStatus } from './lib/api.js'

// Player count, refreshed every 30 seconds. null while the first check runs.
export function useServerStatus() {
  const [status, setStatus] = useState(null)
  useEffect(() => {
    let alive = true
    const check = async () => {
      try {
        const next = await getServerStatus()
        if (alive) setStatus(next)
      } catch {
        if (alive) setStatus({ online: false, unreachable: true })
      }
    }
    check()
    const id = setInterval(check, 30_000)
    return () => {
      alive = false
      clearInterval(id)
    }
  }, [])
  return status
}

export function useUpdater() {
  const [update, setUpdate] = useState(null)
  useEffect(() => window.launcher.updater.onStatus(setUpdate), [])
  return update
}

export function useVersion() {
  const [version, setVersion] = useState('')
  useEffect(() => {
    window.launcher.version().then(setVersion)
  }, [])
  return version
}
