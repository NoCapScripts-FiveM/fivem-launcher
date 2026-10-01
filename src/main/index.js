import { app, BrowserWindow, ipcMain, Menu, shell } from 'electron'
import { autoUpdater } from 'electron-updater'
import { existsSync } from 'node:fs'
import { join } from 'node:path'
import { SERVER_ADDRESS } from '../shared/config.mjs'
import { getPatches, getServerStatus } from './fivem.js'
import icon from '../../resources/icon.png?asset'

let mainWindow = null

// akna loomine
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 560,
    minWidth: 640,
    minHeight: 420,
    resizable: true,
    icon,
    frame: false,
    show: false,
    backgroundColor: '#0f1b26',
    title: 'Launcher',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  })

  // arenduses prindime renderi logid terminali
  if (!app.isPackaged) {
    mainWindow.webContents.on('console-message', (...args) => {
      const message = args[0]?.message ?? args[2]
      console.log('[renderer]', message)
    })
  }

  mainWindow.once('ready-to-show', () => mainWindow.show())

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://')) shell.openExternal(url)
    return { action: 'deny' }
  })
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (url !== mainWindow.webContents.getURL()) {
      event.preventDefault()
      if (url.startsWith('https://')) shell.openExternal(url)
    }
  })

  if (process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// programmi värskendused
function sendToWindow(channel, payload) {
  if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send(channel, payload)
}

function setupUpdater() {
  if (!app.isPackaged) return
  autoUpdater.autoDownload = true
  autoUpdater.on('update-available', (info) => sendToWindow('updater:status', { state: 'downloading', version: info.version }))
  autoUpdater.on('update-downloaded', (info) => sendToWindow('updater:status', { state: 'ready', version: info.version }))
  autoUpdater.on('error', () => {})
  const check = () => autoUpdater.checkForUpdates().catch(() => {})
  check()
  setInterval(check, 30 * 60 * 1000)
}

// IPC liides
function registerIpc() {
  ipcMain.handle('window:minimize', (e) => BrowserWindow.fromWebContents(e.sender)?.minimize())
  ipcMain.handle('window:toggle-maximize', (e) => {
    const win = BrowserWindow.fromWebContents(e.sender)
    if (win) win.isMaximized() ? win.unmaximize() : win.maximize()
  })
  ipcMain.handle('window:close', (e) => BrowserWindow.fromWebContents(e.sender)?.close())
  ipcMain.handle('app:version', () => app.getVersion())
  ipcMain.handle('server:status', () => getServerStatus())
  ipcMain.handle('patches:list', () => getPatches())

  ipcMain.handle('game:installed', () => {
    const base = process.env.LOCALAPPDATA
    return Boolean(base) && existsSync(join(base, 'FiveM', 'FiveM.exe'))
  })
  ipcMain.handle('game:play', () => shell.openExternal(`fivem://connect/${SERVER_ADDRESS}`))
  ipcMain.handle('game:install-fivem', () => shell.openExternal('https://fivem.net/'))

  ipcMain.handle('updater:install', () => autoUpdater.quitAndInstall())
}

// Peamine käivitus
if (!app.requestSingleInstanceLock()) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
  app.whenReady().then(() => {
    if (app.isPackaged) Menu.setApplicationMenu(null)
    registerIpc()
    createWindow()
    setupUpdater()
  })
  app.on('window-all-closed', () => app.quit())
}
