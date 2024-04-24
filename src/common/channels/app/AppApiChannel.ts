import {StringUtils} from "@common/utils/StringUtils";

export class AppApiChannel {
    private static channelsPrefix = 'app'

    // 获取应用版本
    static readonly GET_APP_VERSION = StringUtils.joinPaths(this.channelsPrefix, 'getAppVersion')
    // 获取应用名称
    static readonly GET_APP_NAME = StringUtils.joinPaths(this.channelsPrefix, 'getAppName')
    // 获取应用源文件存储位置
    static readonly GET_APP_RESOURCE_PATH = StringUtils.joinPaths(this.channelsPrefix, 'getAppResourcePath')
    // 获取系统盘应用存储位置
    static readonly GET_APP_DATA_PATH = StringUtils.joinPaths(this.channelsPrefix, 'getAppDataPath')
    // 获取系统盘临时文件存储位置
    static readonly GET_APP_TEMP_DATA_PATH = StringUtils.joinPaths(this.channelsPrefix, 'getAppTempDataPath');
    // 获取应用日志文件存储位置
    static readonly GET_APP_LOG_PATH = StringUtils.joinPaths(this.channelsPrefix, 'getAppLogPath');
    // 获取应用缓存存储位置
    static readonly GET_APP_CACHE_PATH = StringUtils.joinPaths(this.channelsPrefix, 'getAppCachePath');
    // 打开给定文件或路径
    static readonly OPEN_PATH = StringUtils.joinPaths(this.channelsPrefix, 'openPath');
    // 计算文件大小
    static readonly GET_FOLDER_SIZE = StringUtils.joinPaths(this.channelsPrefix, 'getFolderSize');
    // 应用重启
    static readonly RELAUNCH = StringUtils.joinPaths(this.channelsPrefix, 'relaunch')
    // 打开默认浏览器
    static readonly OPEN_DEFAULT_BROWSER = StringUtils.joinPaths(this.channelsPrefix, 'openDefaultBrowser')

}
