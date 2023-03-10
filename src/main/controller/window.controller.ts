import {Controller, IpcHandle, Window} from "einf";
import {channels} from "@render/api/channels";
import {BrowserWindow} from "electron";

@Controller()
export class WindowController {
    constructor(
        @Window() private readonly mainWindow: BrowserWindow, // 主窗口实例
    ) {
    }

    @IpcHandle(channels.window.max)
    public windowMax() {
        if (this.mainWindow.isMaximized())
            this.mainWindow.restore()
        else
            this.mainWindow.maximize()
    }

    @IpcHandle(channels.window.min)
    public windowMin() {
        this.mainWindow.minimize()
    }

    @IpcHandle(channels.window.close)
    public windowClose() {
        this.mainWindow.close()
    }


}
