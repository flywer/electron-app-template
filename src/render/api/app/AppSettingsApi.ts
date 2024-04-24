import {ipcInstance} from "@render/plugins";
import {AppSettings} from "@main/entity/localCache/AppSettings";
import {AppSettingsApiChannel} from "@common/channels/app/AppSettingsApiChannel";

export class AppSettingsApi {

    /**
     * 获取应用设置
     **/
    static getAppSettingByName(settingName: string): Promise<null | AppSettings> {
        return ipcInstance.send(AppSettingsApiChannel.GET_APP_SETTING, settingName)
    }

    /**
     * 设置应用设置
     **/
    static setAppSettingByName(settingName: string, settingValue: string): Promise<any> {
        return ipcInstance.send(AppSettingsApiChannel.SET_APP_SETTING, settingName, settingValue)
    }

    /**
     * 创建设置窗口
     **/
    static createAppSettingWindow(): Promise<any> {
        return ipcInstance.send(AppSettingsApiChannel.CREATE_SETTING_WINDOW)
    }
}
