import {Controller, IpcHandle} from "@main/framework/decorators";
import {AppNotificationChannel} from "@common/channels/AppNotificationChannel";
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

    @IpcHandle(AppNotificationChannel.READ_NOTIFICATION)
    public readNotification(id: number) {
        return LocalCacheSource.getRepository(AppNotification).delete({
            id: id
        })
    }

    @IpcHandle(AppNotificationChannel.READ_ALL_NOTIFICATIONS)
    public readAllNotifications(id: number) {
        return LocalCacheSource.getRepository(AppNotification).clear()
    }

    @IpcHandle(AppNotificationChannel.ADD_NOTIFICATION)
    public addNotification(notification: AppNotification):Promise<InsertResult> {
        return LocalCacheSource.getRepository(AppNotification).insert(notification)
    }
}
