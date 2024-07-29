import {app, BrowserWindow, ipcMain} from "electron";
import {
    INJECT_NAME,
    INJECT_TYPE,
    INJECTABLE,
    IPC_HANDLE,
    IPC_ON,
    IPC_SEND,
    IPC_SEND_ALL,
    IPC_WIN_NAME,
    PARAMTYPES_METADATA
} from "@main/framework/windowManager/constants";
import {Singleton} from "@main/decorators/Singleton";
import {v4 as uuidv4} from 'uuid';
import log from "electron-log";

type Construct<T = any> = new (...args: Array<any>) => T
export type ControllerClass = Construct

export type OptionWindowType =
    WindowOpts[]
    | (() => WindowOpts | Promise<WindowOpts>)[]
    | WindowOpts
    | (() => WindowOpts | Promise<WindowOpts>)
    | BrowserWindow
    | (() => BrowserWindow | Promise<BrowserWindow>)

export interface WindowOpts {
    /**
     * Window's name, you can use @Window(name) to inject window
     */
    name: string
    win: BrowserWindow
}

interface InjectableOpts {
    name: string
    inject: any
}

interface Options {
    /**
     * 应用程序准备就绪时将创建 Windows
     */
    window: OptionWindowType
    /**
     * 自动初始化controller
     */
    controllers: ControllerClass[]
    /**
     * 自定义inject属性
     */
    injects?: InjectableOpts[]
}

@Singleton
export class WindowManager {
    private static windows: WindowOpts[] = [];
    private static existInjectableClass: Record<string, any> = {};
    private static logger = log.scope('WindowManager');
    private static options: Options
    private static registeredChannels: Set<string> = new Set(); // 记录已注册的管道名

    public static async init(options: Options) {
        WindowManager.options = options
        await this.addWindows(options.window)
    }

    public static getWindows() {
        return WindowManager.windows
    }

    /**
     * 通过窗口ID获取窗口实例
     * @param windowId 窗口ID
     **/
    public static getBrowserWindowById(windowId: number) {
        return WindowManager.windows.find((window) => window.win.id === windowId).win
    }

    public static getBrowserWindowByName(winName: string) {
        return WindowManager.windows.find((window) => window.name === winName).win
    }

    /**
     * 添加新窗口、并重置Controller
     **/
    public static async addWindows(window: OptionWindowType) {
        await app.whenReady()
        await WindowManager.initWindows(window)
        await WindowManager.initControllers()
    }

    private static async initWindows(window: OptionWindowType) {

        let windows: WindowOpts[] = []

        if (Array.isArray(window)) {
            for (const win of window) {

                const existWinName = WindowManager.windows.map(win => win.name)

                if (typeof win === 'function') {
                    const win1 = await win()
                    if (!existWinName.includes(win1.name)) {
                        windows.push(win1)
                        win1.win.on('closed', () => {
                            WindowManager.removeWindow(win1)
                        })
                    } else {
                        win1?.win.close()
                        WindowManager.getBrowserWindowByName(win1.name)?.focus()
                    }
                } else {
                    if (!existWinName.includes(win.name)) {
                        windows.push(win)
                        win.win.on('closed', () => {
                            WindowManager.removeWindow(win)
                        })
                    } else {
                        win?.win.close()
                        WindowManager.getBrowserWindowByName(win.name)?.focus()
                    }
                }
            }
        } else {

            const existWinName = WindowManager.windows.map(win => win.name)

            // 这里window不是数组
            if (typeof window === 'function') {
                // window是一个返回WindowOpts或BrowserWindow的函数
                const result = await window();
                if (result instanceof BrowserWindow) {
                    // result是BrowserWindow实例
                    windows = [{name: 'window_' + uuidv4(), win: result}];
                } else if (result && typeof result === 'object' && result.win) {
                    // 假设result是一个对象且包含win属性，则认为它是WindowOpts类型
                    if (!existWinName.includes(result.name)) {
                        windows = [result];
                    } else {
                        result?.win.close()
                        WindowManager.getBrowserWindowByName(result.name)?.focus()
                    }
                }
            } else if (window instanceof BrowserWindow) {
                // window是BrowserWindow实例
                windows = [{name: 'window_' + uuidv4(), win: window}];
            } else if (window && typeof window === 'object' && window.win) {
                // window是一个对象且包含win属性，我们假定它是WindowOpts类型
                if (!existWinName.includes(window.name)) {
                    windows = [window];
                } else {
                    window?.win.close()
                    WindowManager.getBrowserWindowByName(window.name)?.focus()
                }
            }

            // 注册关闭事件监听器
            windows[0]?.win.on('closed', () => {
                WindowManager.removeWindow(windows[0])
            })
        }


        for (let win of windows) {
            const existWinName = WindowManager.windows.map(win => win.name)
            if (existWinName.includes(win.name)) {
                WindowManager.logger.error(`Window name [${win.name}] already exist`)
            } else {
                WindowManager.windows.push(win)
            }
        }
    }

    private static removeWindow(windowOpts: WindowOpts): void {
        WindowManager.windows = WindowManager.windows.filter(win => win.name !== windowOpts.name);
    }

    private static factory<T>(constructClass: Construct<T>): T {
        const paramtypes: any[] = Reflect.getMetadata(PARAMTYPES_METADATA, constructClass)
        let providers: any[] = []
        if (paramtypes) {
            providers = paramtypes.map((provider: Construct<T> | any, index) => {
                const injectType = Reflect.getMetadata(INJECTABLE, provider)
                if (injectType === INJECT_TYPE.CLASS) {
                    const {name} = provider
                    const item = WindowManager.existInjectableClass[name] || this.factory(provider)
                    WindowManager.existInjectableClass[name] = item
                    return item
                } else if (injectType === INJECT_TYPE.CUSTOM) {
                    const name = Reflect.getMetadata(INJECT_NAME, provider)
                    const injectInfo = WindowManager.options.injects.find(item => item.name === name)
                    if (!injectInfo)
                        throw new Error(`${name} is not provided to inject`)

                    return injectInfo.inject
                } else if (injectType === INJECT_TYPE.WINDOW) {
                    const name = Reflect.getMetadata(INJECT_NAME, provider)
                    const winOpt = WindowManager.windows.find(item => item.name === name)

                    if (!winOpt)
                        throw new Error(`${name} is not provided to inject`)

                    return winOpt.win
                } else {
                    throw new Error(`${constructClass.name}'s parameter [${index}] is not injectable or is a circular dependency`)
                }
            })
        }

        // eslint-disable-next-line new-cap
        return new constructClass(...providers)
    }

    private static async initControllers() {
        for (const ControllerClass of WindowManager.options.controllers) {
            const controller = this.factory(ControllerClass);
            const proto = ControllerClass.prototype;
            const funcs = Object.getOwnPropertyNames(proto).filter(
                item => typeof controller[item] === 'function' && item !== 'constructor',
            );

            funcs.forEach((funcName) => {
                const handleChannel = getMetadata(proto, funcName, IPC_HANDLE);
                const onChannel = getMetadata(proto, funcName, IPC_ON);
                const sendChannel = getMetadata(proto, funcName, IPC_SEND);
                const sendAllChannel = getMetadata(proto, funcName, IPC_SEND_ALL);

                if (handleChannel) {
                    this.registerIpcHandle(handleChannel, controller, funcName);
                } else if (onChannel) {
                    this.registerIpcOn(onChannel, controller, funcName);
                } else if (sendChannel) {
                    this.registerIpcSend(sendChannel, controller, funcName, proto);
                } else if (sendAllChannel) {
                    this.registerIpcSendAll(sendAllChannel, controller, funcName);
                }
            });
        }
    }

    private static registerIpcHandle(channel: string, controller: any, funcName: string) {
        if (!WindowManager.registeredChannels.has(channel)) {
            ipcMain.handle(channel, async (e, ...args) => {
                try {
                    return await controller[funcName].apply(controller, [...args, e]);
                } catch (error: any) {
                    WindowManager.logger.error(error);
                    WindowManager.logger.error(`With args: ${JSON.stringify(args)}`);
                    throw new Error(error?.message ?? error);
                }
            });
            WindowManager.registeredChannels.add(channel);
        }
    }

    private static registerIpcOn(channel: string, controller: any, funcName: string) {
        if (!WindowManager.registeredChannels.has(channel)) {
            ipcMain.on(channel, async (e, ...args) => {
                try {
                    await controller[funcName].apply(controller, [...args, e]);
                } catch (error: any) {
                    WindowManager.logger.error(error);
                    throw new Error(error?.message ?? error);
                }
            });
            WindowManager.registeredChannels.add(channel);
        }
    }

    private static registerIpcSend(channel: string, controller: any, funcName: string, proto: any) {
        if (!WindowManager.registeredChannels.has(channel)) {
            const winName = getMetadata(proto, funcName, IPC_WIN_NAME);
            const winInfo = WindowManager.windows.find(item => item.name === winName);

            if (winInfo) {
                const {webContents} = winInfo.win;
                const func = controller[funcName];

                controller[funcName] = async (...args: any[]) => {
                    const result = await func.apply(controller, args);
                    webContents.send(channel, result);
                    return result;
                };
            } else {
                WindowManager.logger.warn(`${IPC_SEND}: Can not find window [${winName}] to send data through [${channel}]`);
            }

            WindowManager.registeredChannels.add(channel);
        }
    }

    private static registerIpcSendAll(channel: string, controller: any, funcName: string) {
        if (!WindowManager.registeredChannels.has(channel)) {
            const originalFunc = controller[funcName].bind(controller);

            controller[funcName] = async (...args: any[]) => {
                const result = await originalFunc(...args);
                WindowManager.windows.forEach(winInfo => {
                    if (winInfo && winInfo.win && !winInfo.win.isDestroyed()) {
                        winInfo.win.webContents.send(channel, result);
                    }
                });
                return result;
            };

            WindowManager.registeredChannels.add(channel);
        }
    }


}

/**
 *  获取元数据
 *  @param target 目标对象
 *  @param propertyKey 属性名
 *  @param metadataKey 元数据键，也就是装饰器的名字
 **/
function getMetadata(target: any, propertyKey: string, metadataKey: string): string | undefined {
    return Reflect.getMetadata(metadataKey, target, propertyKey);
}
