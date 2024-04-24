import {join} from "path";
import {app} from "electron";

export class WindowConstant {

    static readonly BASE_URL = app.isPackaged
        ? `file://${join(app.getAppPath(), 'dist/render/index.html')}#/`
        : process.env["DS_RENDERER_URL"] + '/#/'

    // 主窗口
    static readonly MAIN_WINDOW_URL = this.BASE_URL + 'main-window'

    // 设置窗口
    static readonly SETTING_WINDOW_URL = this.BASE_URL + 'setting-window'
}
