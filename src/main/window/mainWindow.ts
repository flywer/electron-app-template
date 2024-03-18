import {join} from 'path'
import {BrowserWindow, app} from 'electron'
import {WindowConstant} from "@common/constants/WindowConstant";
import log from "electron-log";
import {DEFAULT_WIN_NAME} from "@main/framework/constants";

const isDev = !app.isPackaged

export async function createMainWindow() {
    const win = new BrowserWindow({
        width: 1300,
        height: 800,
        minWidth: 700,
        minHeight: 400,
        frame: false, // 无边框
        webPreferences: {
            nodeIntegration: false, // 不允许 Node.js APIs 在渲染进程中使用
            contextIsolation: true, // 开启上下文隔离
            preload: join(__dirname, '../preload/index.js'),
            devTools: isDev,
            // webSecurity: false,// 开启跨域访问
            // nodeIntegrationInWorker: true, // 允许 Node.js APIs 在 Web Worker 中使用
            // nodeIntegrationInSubFrames: true // 允许 Node.js APIs 在子 frame 中使用
        },
        show: false,
        autoHideMenuBar: !isDev,
    })

    win.loadURL(WindowConstant.MAIN_WINDOW_URL).catch(error => {
        log.error(error)
    })

    win.once('ready-to-show', async () => {
        win.show() // 当渲染器加载完毕时显示窗口
    });

    if (isDev)
        win.webContents.openDevTools()
    else
        win.removeMenu()

    win.on('closed', () => {
        win.destroy()
        app.exit(0)
    })

    return {name: DEFAULT_WIN_NAME, win: win}
}
