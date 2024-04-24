import {ipcInstance} from "@render/plugins";
import {AppNotificationChannel} from "@common/channels/app/AppNotificationChannel";
import {AppNotification} from "@main/entity/localCache/AppNotification";
import {InsertResult} from "typeorm";

export class AppNotificationApi {

    /**
     * 获取通知
     **/
    static getNotifications(): Promise<AppNotification[]> {
        return ipcInstance.send(AppNotificationChannel.GET_NOTIFICATIONS)
    }

    /**
     * 通知已读
     **/
    static readNotification(id: number) {
        return ipcInstance.send(AppNotificationChannel.READ_NOTIFICATION, id)
    }

    static clearNotification(id: number) {
        return ipcInstance.send(AppNotificationChannel.CLEAR_NOTIFICATION, id)
    }

    /**
     * 全部通知已读
     **/
    static async clearAllNotifications() {
        return ipcInstance.send(AppNotificationChannel.CLEAR_ALL_NOTIFICATIONS)
    }

    static async readAllNotifications() {
        return ipcInstance.send(AppNotificationChannel.READ_ALL_NOTIFICATIONS)
    }

    /**
     * 新增通知
     **/
    static async addNotification(notification: AppNotification): Promise<InsertResult> {
        return ipcInstance.send(AppNotificationChannel.ADD_NOTIFICATION, notification)
    }
}
