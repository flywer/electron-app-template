import {ipcInstance} from '@render/plugins'
import {WindowApiChannel} from "@common/channels/WindowApiChannel";

export class WindowApi {

    /**
     * 窗口最小化
     **/
    static async windowMinimize() {
        const webContentsId = await ipcInstance.send(WindowApiChannel.GET_WEB_CONTENTS_ID)
        return ipcInstance.send(WindowApiChannel.MINIMIZE, webContentsId)
    }

    /**
     * 窗口最大化
     **/
    static async windowMaximize() {
        const webContentsId = await ipcInstance.send(WindowApiChannel.GET_WEB_CONTENTS_ID)
        return ipcInstance.send(WindowApiChannel.MAXIMIZE, webContentsId)
    }

    /**
     * 窗口关闭
     **/
    static async windowClose() {
        const webContentsId = await ipcInstance.send(WindowApiChannel.GET_WEB_CONTENTS_ID)
        return ipcInstance.send(WindowApiChannel.CLOSE, webContentsId)
    }

    /**
     * 窗口置顶
     **/
    static async windowTop(isOnTop: boolean) {
        const webContentsId = await ipcInstance.send(WindowApiChannel.GET_WEB_CONTENTS_ID)
        return ipcInstance.send(WindowApiChannel.TOP, webContentsId, isOnTop)
    }

}
