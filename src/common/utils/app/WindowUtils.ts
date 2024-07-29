import {WindowManager} from "@main/framework/windowManager/WindowManager";
import {DEFAULT_WIN_NAME} from "@main/framework/windowManager/constants";
import {app, BrowserWindow} from "electron";
import {join} from "path";
import {BASE_URL} from "@common/constants/app/BaseUrl";

export type CreateWindowParams = {
    windowName: string,
    windowUrl: string,
    windowWidth?: number,
    windowHeight?: number,
    resizable?: boolean
}

export class WindowUtils {

    public static createWindow(params: CreateWindowParams) {
        const mainWindow = WindowManager.getBrowserWindowByName(DEFAULT_WIN_NAME)
        const isDev = !app.isPackaged

        const width = params?.windowWidth || 800
        const height = params?.windowHeight || 500

        const win = new BrowserWindow({
            width: width,
            height: height,
            resizable: params.resizable,
            frame: false, // 无边框
            x: mainWindow.getPosition()[0] + mainWindow.getSize()[0] / 2 - width / 2,
            y: mainWindow.getPosition()[1] + mainWindow.getSize()[1] / 2 - height / 2,
            modal: true,
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

        win.loadURL(BASE_URL + params.windowUrl)

        win.once('ready-to-show', async () => {
            win.show() // 当渲染器加载完毕时显示窗口
        });

        if (isDev)
            win.webContents.openDevTools()
        else
            win.removeMenu()

        win.on('closed', () => {
            win.destroy()
        })

        return {
            name: params.windowName,
            win: win
        }
    }

}
