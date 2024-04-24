import "reflect-metadata";
import {
    DEFAULT_WIN_NAME,
    INJECTABLE,
    INJECT_NAME,
    INJECT_TYPE,
    IPC_HANDLE,
    IPC_ON,
    IPC_SEND,
    IPC_WIN_NAME,
    PARAMTYPES_METADATA, IPC_SEND_ALL
} from './constants'
import {WindowManager} from "@main/framework/WindowManager";
import log from "electron-log";

/**
 * Ipc handle decorator. It will be called by ipcRenderer.invoke
 *
 * ipcMain.handle --> @IpcHandle
 */
export function IpcHandle(channel: string): MethodDecorator {
    if (!channel)
        throw new Error('ipc handle channel is required')

    return (target, propertyName) => {
        Reflect.defineMetadata(IPC_HANDLE, channel, target, propertyName)
    }
}

/**
 * Ipc on decorator. It will be called by ipcRenderer.send/sendSync
 *
 * ipcMain.on --> @IpcOn
 */
export function IpcOn(channel: string): MethodDecorator {
    if (!channel)
        throw new Error('ipc on channel is required')

    return (target, propertyName) => {
        Reflect.defineMetadata(IPC_ON, channel, target, propertyName)
    }
}

/**
 * Ipc send decorator. The return value will be sent by the webContents of the specified window
 *
 * webContents.send --> @IpcSend
 */

/*export function IpcSend(channel: string, windowName: string = DEFAULT_WIN_NAME): MethodDecorator {
    if (!channel)
        throw new Error('ipc send channel is required')

    return (target, propertyName) => {
        Reflect.defineMetadata(IPC_SEND, channel, target, propertyName)
        Reflect.defineMetadata(IPC_WIN_NAME, windowName, target, propertyName)
    }
}*/

/**
 * Ipc send decorator. The return value will be sent by the webContents of the specified window
 *
 * webContents.send --> @IpcSend
 */
export function IpcSendPlus(channel: string, windowName: string = DEFAULT_WIN_NAME): MethodDecorator {
    return function (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        // 覆写原始方法的实现
        descriptor.value = async function (...args: any[]) {
            // 首先，调用原始方法，获取结果
            const result = await originalMethod.apply(this, args);

            // 然后，发送IPC消息到渲染进程
            const winInfo = WindowManager.getWindows().find(item => item.name === windowName);
            if (winInfo && winInfo.win && !winInfo.win.isDestroyed()) {
                winInfo.win.webContents.send(channel, result);
            } else {
                log.warn(`Window ${windowName} not found or destroyed; IPC message not sent.`);
            }

            // 返回原始方法的结果
            return result;
        };

        return descriptor;
    };
}

/**
 * Ipc send decorator.The return value will be sent by the webContents of all existing windows
 **/
export function IpcSendAll(channel: string): MethodDecorator {
    if (!channel)
        throw new Error('ipc send channel is required')

    return (target, propertyName) => {
        Reflect.defineMetadata(IPC_SEND_ALL, channel, target, propertyName)
    }
}

/**
 * Controller decorator, help to initialize controller
 */
export function Controller(): ClassDecorator {
    return (_) => {
        // do nothing
    }
}

/**
 * Injectable decorator, help to inject service
 */
export function Injectable(): ClassDecorator {
    return (target) => {
        Reflect.defineMetadata(INJECTABLE, INJECT_TYPE.CLASS, target)
    }
}

/**
 * Inject decorator, help to inject custom injectable item
 */
export function Inject(name: string): ParameterDecorator {
    if (!name)
        throw new Error('inject name is required')

    return (target, _, index) => {
        const param = Reflect.getMetadata(PARAMTYPES_METADATA, target)[index]
        Reflect.defineMetadata(INJECTABLE, INJECT_TYPE.CUSTOM, param)
        Reflect.defineMetadata(INJECT_NAME, name, param)
    }
}

/**
 * Window decorator, help to inject window
 */
export function Window(name = DEFAULT_WIN_NAME): ParameterDecorator {
    return (target, _, index) => {
        const param = Reflect.getMetadata(PARAMTYPES_METADATA, target)[index]
        Reflect.defineMetadata(INJECTABLE, INJECT_TYPE.WINDOW, param)
        Reflect.defineMetadata(INJECT_NAME, name, param)
    }
}
