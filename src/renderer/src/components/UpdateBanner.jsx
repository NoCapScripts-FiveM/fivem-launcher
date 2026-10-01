export default function UpdateBanner({ update }) {
  return (
    <div
      role="status"
      className="flex items-center justify-between gap-4 bg-sodium px-5 py-1.5 text-xs font-medium text-night"
    >
      {update.state === 'ready' ? (
        <>
          <span>Uus versioon on saadaval {update.version}.</span>
          <button
            type="button"
            onClick={() => window.launcher.updater.install()}
            className="rounded bg-night px-3 py-1 font-semibold text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-night"
          >
            Taaskäivita programm ja uuenda.
          </button>
        </>
      ) : (
        <span>Uuendame programmi {update.version}…</span>
      )}
    </div>
  )
}
