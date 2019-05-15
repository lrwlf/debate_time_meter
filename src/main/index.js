import { app, BrowserWindow, dialog, MenuItem, Menu, ipcRenderer } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
let newWindow
const winURL = process.env.NODE_ENV === 'development' ?
    `http://localhost:9080` :
    `file://${__dirname}/index.html`
    //const electron = require('electron');
    //const Menu = electron.Menu
    //const app = electron.app
function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000,
        frame: true,
        resizable: false,
        maximizable: false,
        icon: 'static/icon.ico',
        webPreferences: {
            webSecurity: false,
        },
    })

    mainWindow.loadURL(winURL)

    mainWindow.on('closed', () => {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})

const electron = require('electron')
const ipc = electron.ipcMain
    //登录窗口最小化
ipc.on('window-min', function() {
        mainWindow.minimize();
    })
    //登录窗口最大化
ipc.on('window-max', function() {
    mainWindow.setSize(electron.screen.getPrimaryDisplay().workAreaSize.width, electron.screen.getPrimaryDisplay().workAreaSize.height + 20); //高度溢出遮盖顶栏
    mainWindow.setKiosk(true);
})
ipc.on('reNomalsize', function() {
    mainWindow.setKiosk(false);
    mainWindow.setBounds({ x: 440, y: 225, width: 1000, height: 583 })

})
ipc.on('window-close', function() {
    mainWindow.close();
})
ipc.on('open-directory-dialog', function(event, index) {
    dialog.showOpenDialog({
        properties: ['openFile']
    }, function(files) {
        if (files)
            event.sender.send('selectedItem', [files, index]);
    });
})
ipc.on('sigShowRightClickMenu', (event) => {
    const menu = new Menu();
    menu.append(new MenuItem({ label: 'Hello world' }));
})