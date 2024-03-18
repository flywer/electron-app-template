import log from "electron-log";
import {autoUpdater} from "electron-updater";
import {Notification} from 'electron'

// 应用自动更新管理
export class AppUpdater {

    public static updaterInit() {
        //启用自动更新，会在每次检测到可更新版本时自动更新
        autoUpdater.autoDownload = true

        // 开始检测更新
        autoUpdater.on('checking-for-update', async function () {
            log.info('正在检测更新...')
        });

        // 当没有可用更新的时候触发
        autoUpdater.on('update-not-available', async function (info) {
            log.info(`无可用更新 v${info.version}`)
        });

        // 当发现一个可用更新的时候触发
        autoUpdater.on('update-available', async function (info) {
            log.info(`发现可用更新 v${info.version}`)
            let notice = new Notification({
                title: `应用更新`,
                body: `🆕 发现新更新 v${info.version}，开始下载...`
            })

            notice.show()
        });

        //安装包下载完成
        autoUpdater.on('update-downloaded', function () {
            let notice = new Notification({
                title: `应用更新`,
                body: `新版本下载完毕，点击此处立即退出并安装`
            })

            notice.show()

            notice.on('click', () => {
                //退出并安装
                autoUpdater.quitAndInstall();
                notice.close()
            })

        });

        autoUpdater.on('error', function (error) {
            log.error('应用更新失败\n', error)
            let notice = new Notification({
                title: `应用更新失败`
            })
            notice.show()
        });

        autoUpdater.checkForUpdates().catch(e => {
            log.error(e)
            throw new Error('应用检查更新失败')
        })
    }
}
