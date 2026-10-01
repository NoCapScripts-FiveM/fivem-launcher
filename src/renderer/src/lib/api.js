// Päringud tehakse main protsessis (src/main/fivem.js), sest brauser blokeerib otsepäringud (CORS).
export const getPatches = () => window.launcher.patches()
export const getServerStatus = () => window.launcher.serverStatus()
