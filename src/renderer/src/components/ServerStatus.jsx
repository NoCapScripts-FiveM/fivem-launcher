export default function ServerStatus({ status }) {
  let dot = 'bg-muted'
  let text = 'Kontrollime serveri olemasolu…'

  if (status?.unreachable) {
    dot = 'bg-bad'
    text = "Serveri informatiooni laadimine ei õnnestunud"
  } else if (status && !status.online) {
    dot = 'bg-bad'
    text = 'Server on kinni'
  } else if (status) {
    dot = 'bg-ok'
    text = status.maxPlayers
      ? `Mängijaid: ${status.players} / ${status.maxPlayers} kokku`
      : `Aktiivne, ${status.players} mängijaid kokku`
  }

  return (
    <p className="mt-2 flex items-center gap-2 text-[13px] text-muted" role="status">
      <span className={`h-2 w-2 rounded-full ${dot}`} aria-hidden="true" />
      {text}
    </p>
  )
}
