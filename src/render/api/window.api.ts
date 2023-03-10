import {ipcInstance} from '@render/plugins'
import {channels} from "@render/api/channels";


/**
 * 窗口最大化
 */
export const window_max = () => {
    return ipcInstance.send<string>(channels.window.max);
}

/**
 * 窗口最小化
 */
export const window_min = () => {
    return ipcInstance.send<string>(channels.window.min);
}

/**
 * 窗口关闭
 */
export const window_close = () => {
    return ipcInstance.send<string>(channels.window.close);
}
