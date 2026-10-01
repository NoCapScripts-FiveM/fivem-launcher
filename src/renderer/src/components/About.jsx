import ServerPlate from './ServerPlate.jsx'
import { useVersion } from '../hooks.js'

// About page: server plate, short description, version and links.
export default function About() {
  const version = useVersion()

  return (
    <section className="flex h-full flex-col gap-6 p-6">
      <ServerPlate />

      <div className="space-y-2">
        <h2 className="m-0 font-display text-lg font-semibold">Launcherist</h2>
        <p className="m-0 max-w-prose text-sm leading-relaxed text-muted">
          See launcher hoiab serveri informatsiooni ajakohasena ja ühendab sind mänguga ühe klõpsuga.
          Programmi Uuendused laetakse automaatselt alla.
        </p>

      </div>

      <div className="mt-auto flex items-baseline gap-1 text-xs">
        <span className="text-muted">Versioon:</span>
        <span className="text-cyan-300">{version}</span>
      </div>
    </section>
  )
}
