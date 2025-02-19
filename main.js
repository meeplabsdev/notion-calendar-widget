const { app, BrowserWindow } = require('electron')
app.commandLine.appendSwitch("disable-gpu");
app.commandLine.appendArgument("disable-gpu");
const path = require('node:path')
const fs = require('node:fs')

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false,
    }
  })

  mainWindow.loadURL('https://calendar.notion.so/')
  // mainWindow.webContents.openDevTools();

  mainWindow.webContents.setWindowOpenHandler((details) => {
    if (details.url.includes("https://calendar.notion.so/google-permissions")) {
      return { action: "allow" };
    }

    require("electron").shell.openExternal(details.url);
    return { action: "deny" };
  });
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})