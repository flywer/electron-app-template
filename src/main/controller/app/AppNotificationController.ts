import {Controller, IpcHandle, IpcSendPlus} from "@main/framework/decorators";
import {AppNotificationChannel} from "@common/channels/app/AppNotificationChannel";
import {LocalCacheSource} from "@main/dataSource/LocalCacheSource";
import {AppNotification} from "@main/entity/localCache/AppNotification";
import {InsertResult} from "typeorm";

@Controller()
export class AppNotificationController {
    constructor() {
    }

    @IpcHandle(AppNotificationChannel.GET_NOTIFICATIONS)
    public getNotifications() {
        return LocalCacheSource.getRepository(AppNotification).find({
            order: {releaseTime: 'desc'}
        })
    }

    @IpcHandle(AppNotificationChannel.CLEAR_NOTIFICATION)
    public clearNotification(id: number) {
        return LocalCacheSource.getRepository(AppNotification).delete({
            id: id
        })
    }

    @IpcHandle(AppNotificationChannel.CLEAR_ALL_NOTIFICATIONS)
    public clearAllNotifications() {
        return LocalCacheSource.getRepository(AppNotification).clear()
    }

    @IpcHandle(AppNotificationChannel.READ_ALL_NOTIFICATIONS)
    public readAllNotifications() {
        return LocalCacheSource.getRepository(AppNotification).update({}, {readFlag: 1})
    }

    @IpcHandle(AppNotificationChannel.READ_NOTIFICATION)
    public readNotification(id: number) {
        return LocalCacheSource.getRepository(AppNotification).update({id: id}, {readFlag: 1})
    }

    @IpcHandle(AppNotificationChannel.ADD_NOTIFICATION)
    public async addNotification(notification: AppNotification): Promise<InsertResult> {
        if (notification.key) {
            // 若存在相同key则不存入
            if (await LocalCacheSource.getRepository(AppNotification).findOneBy([{key: notification.key}])) {
                return null
            } else {
                return LocalCacheSource.getRepository(AppNotification).insert(notification)
            }
        } else {
            return LocalCacheSource.getRepository(AppNotification).insert(notification)
        }
    }

    /**
     * 主进程新增通知
     **/
    @IpcHandle(AppNotificationChannel.ADD_MAIN_NOTIFICATION)
    public async addMainNotification(notificationModel: AppNotification) {
        const insertResult = await this.addNotification(notificationModel)
        if (insertResult) {
            const notification = await LocalCacheSource.getRepository(AppNotification).findOneBy({id: insertResult.raw})
            this.sendMainNotification(notification)
        }
    }

    /**
     * 主进程发送通知
     **/
    @IpcSendPlus(AppNotificationChannel.SEND_MAIN_NOTIFICATION)
    public sendMainNotification(notification: AppNotification) {
        return notification
    }
}
