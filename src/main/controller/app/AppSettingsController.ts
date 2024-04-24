import {Controller, IpcHandle, IpcSendAll} from "@main/framework/decorators";
import {LocalCacheSource} from "@main/dataSource/LocalCacheSource";
import {AppSettings} from "@main/entity/localCache/AppSettings";
import {AppSettingsApiChannel} from "@common/channels/app/AppSettingsApiChannel";
import {WindowManager} from "@main/framework/WindowManager";
import {createSettingWindow} from "@main/window/settingWindow";
import {AppSettingsConstant} from "@common/constants/app/AppSettingsConstant";
import {app} from "electron";
import {AppTray} from "@main/app/AppTray";

@Controller()
export class AppSettingsController {
    constructor() {
    }

    @IpcHandle(AppSettingsApiChannel.GET_APP_SETTING)
    public handleGetAppSetting(settingName: string) {
        return LocalCacheSource.getRepository(AppSettings).findOneBy({settingName: settingName})
    }

    @IpcHandle(AppSettingsApiChannel.SET_APP_SETTING)
    public async handleSetAppSetting(settingName: string, settingValue: string) {
        // 获取当前设置
        let setting = await LocalCacheSource.getRepository(AppSettings).findOneBy({settingName: settingName});
        if (setting) {
            // 如果存在则更新
            setting.settingValue = settingValue;
        } else {
            // 如果不存在则创建
            setting = new AppSettings();
            setting.settingName = settingName;
            setting.settingValue = settingValue;
        }

        return LocalCacheSource.getRepository(AppSettings).save(setting).then(() => {
            switch (setting.settingName) {
                case AppSettingsConstant.THEME_MODE:
                    this.sendThemeModeUpdated()
                    break
                case AppSettingsConstant.AUTO_START:
                    if (process.platform === "darwin") {
                        app.setLoginItemSettings({
                            openAtLogin: setting.settingValue == 'true'
                        });
                    } else {
                        app.setLoginItemSettings({
                            openAtLogin: setting.settingValue == 'true'
                        });
                    }
                    break
                case AppSettingsConstant.ENABLE_TRAY:
                    if (setting.settingValue == 'true') {
                        AppTray.trayInit()
                    } else {
                        if (!AppTray.tray.isDestroyed()) {
                            AppTray.tray.destroy()
                        }
                    }
                    break
            }

        });
    }

    @IpcSendAll(AppSettingsApiChannel.THEME_MODE_UPDATED)
    public sendThemeModeUpdated() {
        return true
    }

    @IpcHandle(AppSettingsApiChannel.CREATE_SETTING_WINDOW)
    public async createSettingWindow() {
        await WindowManager.addWindows(await createSettingWindow())
    }

}
