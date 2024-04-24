import {WindowManager} from "@main/framework/WindowManager";
import {Controller, IpcHandle} from "@main/framework/decorators";
import {WindowApiChannel} from "@common/channels/app/WindowApiChannel";
import {BrowserWindow, webContents} from "electron";
import {CreateWindowParams, WindowUtils} from "@common/utils/app/WindowUtils";

type CreateWindowParamsAlia = CreateWindowParams

@Controller()
export class WindowController {
    constructor() {
    }

    /**
     * 获取webContentsID
     **/
    @IpcHandle(WindowApiChannel.GET_WEB_CONTENTS_ID)
    public getWebContentsId(args: Electron.IpcMainInvokeEvent) {
        return args.sender.id
    }

    /**
     * 获取webContents
     **/
    @IpcHandle(WindowApiChannel.GET_WEB_CONTENTS)
    public getWebContents(args: Electron.IpcMainInvokeEvent) {
        return args.sender
    }

    /**
     * 窗口最小化
     **/
    @IpcHandle(WindowApiChannel.MINIMIZE)
    public windowMinimize(webContentsId: number) {
        const windowId = BrowserWindow.fromWebContents(webContents.fromId(webContentsId)).id
        WindowManager.getBrowserWindowById(windowId).minimize()
    }

    /**
     * 窗口最大化
     **/
    @IpcHandle(WindowApiChannel.MAXIMIZE)
    public windowMaximize(webContentsId: number) {
        const windowId = BrowserWindow.fromWebContents(webContents.fromId(webContentsId)).id
        const browserWindow = WindowManager.getBrowserWindowById(windowId);
        if (browserWindow.isMaximized())
            browserWindow.restore()
        else
            browserWindow.maximize()
    }

    /**
     * 窗口关闭
     **/
    @IpcHandle(WindowApiChannel.CLOSE)
    public windowClose(webContentsId: number) {
        const windowId = BrowserWindow.fromWebContents(webContents.fromId(webContentsId)).id
        WindowManager.getBrowserWindowById(windowId).close()
    }

    /**
     * 窗口置顶
     **/
    @IpcHandle(WindowApiChannel.TOP)
    public windowTop(webContentsId: number, isOnTop: boolean) {
        const windowId = BrowserWindow.fromWebContents(webContents.fromId(webContentsId)).id
        WindowManager.getBrowserWindowById(windowId).setAlwaysOnTop(isOnTop)
    }

    @IpcHandle(WindowApiChannel.CREATE_WINDOW)
    public async createWindow(params: CreateWindowParamsAlia) {
        await WindowManager.addWindows(WindowUtils.createWindow(params))
    }
}
