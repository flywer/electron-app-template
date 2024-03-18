import {StringUtils} from "@common/utils/StringUtils";

export class AppSettingsApiChannel {
    private static channelsPrefix = 'appSettings'

    // 获取应用设置
    static readonly GET_APP_SETTING = StringUtils.joinPaths(this.channelsPrefix, 'getAppSetting')
    // 设置应用设置
    static readonly SET_APP_SETTING = StringUtils.joinPaths(this.channelsPrefix, 'setAppSetting')
    // 监听应用主题设置变化
    static readonly THEME_MODE_UPDATED = StringUtils.joinPaths(this.channelsPrefix, 'themeModeUpdated')
    // 创建设置窗口
    static readonly CREATE_SETTING_WINDOW = StringUtils.joinPaths(this.channelsPrefix, 'createSettingWindow')
}
