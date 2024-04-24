import {ipcInstance} from '@render/plugins'
import {AppApiChannel} from "@common/channels/app/AppApiChannel";

export class AppApi {

    /**
     * 获取应用版本
     **/
    static getAppVersion() {
        return ipcInstance.send(AppApiChannel.GET_APP_VERSION)
    }

    /**
     * 应用重启
     **/
    static relaunch() {
        return ipcInstance.send(AppApiChannel.RELAUNCH)
    }

    static openDefaultBrowser = (link: string) => {
        return ipcInstance.send(AppApiChannel.OPEN_DEFAULT_BROWSER, link)
    }

    /**
     * 获取应用源文件存储位置
     **/
    static getAppResourcePath = () => {
        return ipcInstance.send(AppApiChannel.GET_APP_RESOURCE_PATH)
    }

    /**
     * 获取应用日志文件存储位置
     **/
    static getAppLogPath = () => {
        return ipcInstance.send(AppApiChannel.GET_APP_LOG_PATH)
    }

    static getAppCachePath = () => {
        return ipcInstance.send(AppApiChannel.GET_APP_CACHE_PATH)
    }

    /**
     * 打开给定文件或路径
     **/
    static openPath = (path: string) => {
        return ipcInstance.send(AppApiChannel.OPEN_PATH, path)
    }

    /**
     * 计算文件大小
     **/
    static getFolderSize = (path: string) => {
        return ipcInstance.send(AppApiChannel.GET_FOLDER_SIZE, path)
    }
}

