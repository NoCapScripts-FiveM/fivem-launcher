import { SERVER_NAME } from '../../../shared/config.mjs'
import logo from '../assets/logo.svg'
import { useVersion } from '../hooks'

const control =
  'grid h-full w-11 place-items-center text-muted transition-colors focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-sodium'

export default function TitleBar() {
  const version = useVersion()
  return (
    <header className="drag flex h-8 shrink-0 select-none items-center justify-between border-b border-line pl-3">
      <span className="flex items-center gap-2 text-xs text-muted">
        <img src={logo} alt="" className="h-4 w-4" />
        {SERVER_NAME} launcher {version}
      </span>
      <div className="no-drag flex h-full">
        <button
          type="button"
          aria-label="Minimize"
          className={`${control} hover:bg-panel hover:text-ink`}
          onClick={() => window.launcher.window.minimize()}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <path d="M0 5h10" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Suurenda"
          className={`${control} hover:bg-panel hover:text-ink`}
          onClick={() => window.launcher.window.toggleMaximize()}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Close"
          className={`${control} hover:bg-bad hover:text-white`}
          onClick={() => window.launcher.window.close()}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true">
            <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" strokeWidth="1" />
          </svg>
        </button>
      </div>
    </header>
  )
}
