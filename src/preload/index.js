import { contextBridge, ipcRenderer } from 'electron'

// subimine
const on = (channel, callback) => {
  const handler = (_event, payload) => callback(payload)
  ipcRenderer.on(channel, handler)
  return () => ipcRenderer.removeListener(channel, handler)
}

// webui
contextBridge.exposeInMainWorld('launcher', {
  window: {
    minimize: () => ipcRenderer.invoke('window:minimize'),
    toggleMaximize: () => ipcRenderer.invoke('window:toggle-maximize'),
    close: () => ipcRenderer.invoke('window:close')
  },
  version: () => ipcRenderer.invoke('app:version'),
  serverStatus: () => ipcRenderer.invoke('server:status'),
  patches: () => ipcRenderer.invoke('patches:list'),
  game: {
    isFivemInstalled: () => ipcRenderer.invoke('game:installed'),
    play: () => ipcRenderer.invoke('game:play'),
    installFivem: () => ipcRenderer.invoke('game:install-fivem')
  },
  updater: {
    onStatus: (callback) => on('updater:status', callback),
    install: () => ipcRenderer.invoke('updater:install')
  }
})
