import {app} from 'electron'
import {AppController} from './controller/app/AppController'
import {createMainWindow} from './window/mainWindow'
import {WindowController} from "@main/controller/app/WindowController";
import {WindowManager} from "@main/framework/windowManager/WindowManager";
import {AppLog} from "@main/app/AppLog";
import {AppConstant} from "@common/constants/app/AppConstant";
import {LocalCacheSource} from "@main/dataSource/LocalCacheSource";
import log from 'electron-log/main'
import {AppSettingsController} from "@main/controller/app/AppSettingsController";
import {AppSettings} from "@main/entity/localCache/AppSettings";
import {AppSettingsConstant} from "@common/constants/app/AppSettingsConstant";
import {AppTray} from "@main/app/AppTray";
import {AppNotificationController} from "@main/controller/app/AppNotificationController";

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = 'true'
process.env.TZ = 'Asia/Shanghai'; // 设置环境变量为中国时区

async function electronAppInit() {

    const isDev = !app.isPackaged

    //设置操作系统全局名称
    app.setAppUserModelId(AppConstant.APP_NAME)

    // 应用日志模块初始化
    AppLog.appLogInit()

    LocalCacheSource.initialize().then(async () => {
        // 开启应用系统托盘
        const enableTray = await LocalCacheSource.getRepository(AppSettings).findOneBy({settingName: AppSettingsConstant.ENABLE_TRAY})
        if (enableTray && enableTray.settingValue == 'true') {
            AppTray.trayInit()
        }

        // 开启硬件加速
        const value = await LocalCacheSource.getRepository(AppSettings).findOneBy({settingName: AppSettingsConstant.HARDWARE_ACCELERATION})
        if (value && value.settingValue == 'false') {
            app.disableHardwareAcceleration()
        }

    }).catch(error => log.error('本地缓存库连接失败', error))

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin')
            app.exit()
    })

    app.on('quit', () => {
        if (!AppTray.tray?.isDestroyed()) {
            AppTray.tray?.destroy()
        }
    })

    if (isDev) {
        if (process.platform === 'win32') {
            process.on('message', (data) => {
                if (data === 'graceful-exit')
                    app.exit()
            })
        } else {
            process.on('SIGTERM', () => {
                app.exit()
            })
        }
    }
}

async function bootstrap() {
    try {
        await electronAppInit()

        await WindowManager.init({
            window: [createMainWindow],
            controllers: [
                AppController,
                WindowController,
                AppSettingsController,
                AppNotificationController
            ],
            injects: [{
                name: 'IS_DEV',
                inject: !app.isPackaged,
            }],
        })
    } catch (error) {
        log.error(error)
        app.quit()
    }
}

bootstrap()
