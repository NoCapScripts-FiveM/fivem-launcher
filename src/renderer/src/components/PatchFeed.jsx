import { useCallback, useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { getPatches } from '../lib/api.js'
import { textButton } from '../styles.js'

// uuenduse paneel
const el = (Tag, className) =>
  function Element({ node, ...props }) {
    return <Tag className={className} {...props} />
  }

const markdown = {
  h1: el('h4', 'mt-3 font-display text-lg font-semibold'),
  h2: el('h4', 'mt-3 font-display text-lg font-semibold'),
  h3: el('h4', 'mt-3 font-display text-base font-semibold'),
  p: el('p', 'mt-2'),
  ul: el('ul', 'mt-2 list-disc space-y-1 pl-5 marker:text-sodium'),
  ol: el('ol', 'mt-2 list-decimal space-y-1 pl-5 marker:text-sodium'),
  strong: el('strong', 'font-semibold text-ink'),
  code: el('code', 'rounded bg-panel px-1 py-0.5 text-[13px]'),
  a: function Link({ node, ...props }) {
    return (
      <a
        {...props}
        target="_blank"
        rel="noreferrer"
        className="text-sodium underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sodium"
      />
    )
  }
}

const formatDate = (date) =>
  new Date(`${date}T12:00:00`).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })

// uuenduste vorm
function PatchForm({ patch, latest }) {
  return (
    <article className="border-t border-line py-4 first:border-t-0 first:pt-0">
      <header className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-display text-xl font-semibold leading-tight">{patch.title}</h3>
        <span className="text-xs text-muted">Versioon {patch.version}</span>
        <time dateTime={patch.date} className="ml-auto text-xs text-muted">
          {formatDate(patch.date)}
        </time>
      </header>

      {(latest || patch.tags?.length > 0) && (
        <ul className="mt-2 flex flex-wrap gap-2">
          {latest && (
            <li className="rounded bg-sodium px-2 py-0.5 text-xs font-semibold text-night">Värsked</li>
          )}
          {patch.tags?.map((tag) => (
            <li key={tag} className="rounded bg-panel px-2 py-0.5 text-xs font-medium text-muted">
              {tag}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-2 max-w-[68ch] text-sm leading-relaxed text-ink/90">
        <ReactMarkdown components={markdown}>{patch.notes}</ReactMarkdown>
      </div>
    </article>
  )
}

export default function PatchFeed() {
  const [state, setState] = useState({ status: 'loading', patches: [] })

  const load = useCallback(async () => {
    setState((s) => ({ ...s, status: 'loading' }))
    try {
      // uuenduste info
      setState({ status: 'ready', patches: await getPatches() })
    } catch {
      setState({ status: 'error', patches: [] })
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  return (
    <section aria-labelledby="patch-heading" className="flex min-h-0 flex-1 flex-col">
      <h2 id="patch-heading" className="font-display text-2xl font-semibold">
        Uuenduste Logid
      </h2>

      <div className="mt-3 min-h-0 flex-1 overflow-y-auto pr-2">
        {state.status === 'loading' && <p className="text-muted">Laeme uuenduste informatiooni…</p>}

        {state.status === 'error' && (
          <div className="flex flex-col gap-2">
            <p role="alert" className="text-bad">
              Ei suudetud informatiooni laadida. Probleem API
            </p>

          </div>
        )}

        {state.status === 'ready' && state.patches.length === 0 && (
          <p className="text-muted">Uusi uuendusi pole hetkel. Uuendused lisatakse!</p>
        )}

        {state.status === 'ready' &&
          state.patches.map((patch, i) => <PatchForm key={patch.id} patch={patch} latest={i === 0} />)}

      </div>
      <button type="button" onClick={load} className={textButton}>
        Värskendage
      </button>
    </section>
  )
}
