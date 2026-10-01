import { useState } from 'react'
import TitleBar from './components/TitleBar.jsx'
import UpdateBanner from './components/UpdateBanner.jsx'
import ServerPlate from './components/ServerPlate.jsx'
import ServerStatus from './components/ServerStatus.jsx'
import PlayPanel from './components/PlayPanel.jsx'
import PatchFeed from './components/PatchFeed.jsx'
import About from './components/About.jsx'
import { useServerStatus, useUpdater, useVersion } from './hooks.js'
import { textButton } from './styles.js'

const UCP_URL = 'https://fivemucp.vercel.app/login'

export default function App() {
  const serverStatus = useServerStatus()
  const update = useUpdater()
  const version = useVersion()
  const [showAbout, setShowAbout] = useState(false)

  return (
    <div className="flex h-full flex-col bg-zinc-800 text-ink">
      <TitleBar />
      {update && <UpdateBanner update={update} />}

      <main className="flex min-h-0 flex-1">
        <aside className="flex w-80 shrink-0 flex-col gap-4 overflow-y-auto border-r border-line p-4 lg:w-72 lg:p-5">
          <ServerPlate />


          <div className="mt-auto flex flex-col gap-4">
            <ServerStatus status={serverStatus} />
            <PlayPanel />
          </div>

          <div className="grid justify-between gap-3">
            <button type="button" onClick={() => setShowAbout((v) => !v)} className={textButton}>
              {showAbout ? 'Tagasi' : 'Oluline info'}
            </button>

            <button type="button" onClick={() => window.open(UCP_URL, '_blank')} className={textButton}>
              Veebileht
            </button>
          </div>

          <p className="m-0 text-xs text-muted">
            Versioon: <span className="text-cyan-300">{version}</span>
          </p>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col overflow-y-auto bg-panel/40 p-4 lg:p-5">
          {showAbout ? <About /> : <PatchFeed />}
        </div>
      </main>
    </div>
  )
}
