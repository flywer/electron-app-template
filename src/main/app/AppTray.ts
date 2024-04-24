import {Singleton} from "@main/decorators/Singleton";
import {app, BrowserWindow, Menu, MenuItem, nativeImage, Tray} from "electron";
import path from "path";
import {AppConstant} from "@common/constants/app/AppConstant";

// 应用系统托盘
@Singleton
export class AppTray {

    public static tray: Tray = null;

    public static trayInit() {
        const logoPath = path.join(AppConstant.APP_EXTERNAL_ASSETS_PATH, 'logo_32.ico')
        const icon = nativeImage.createFromPath(logoPath)
        this.tray = new Tray(icon)

        this.tray.setToolTip(AppConstant.APP_NAME)

        let quitMenuItem = new MenuItem({
            label: '退出',
            role: "quit"
        })

        let appRelaunchMenuItem = new MenuItem({
            label: '重启应用',
            click: () => {
                app.relaunch()
                app.exit(0)
            }
        })

        const contextMenu = Menu.buildFromTemplate([
            /*  {type: 'separator'},*/
            appRelaunchMenuItem,
            quitMenuItem
        ])

        this.tray.setContextMenu(contextMenu)

        this.tray.on('click', async () => {
            // 点击tray图标时触发，一般习惯点击后显示应用
            BrowserWindow.getAllWindows().at(0).show()
        })

    }
}
