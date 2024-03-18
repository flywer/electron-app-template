import {StringUtils} from "@common/utils/StringUtils";

export class AppNotificationChannel {
    private static channelsPrefix = 'appNotification'

    // 获取通知
    static readonly GET_NOTIFICATIONS = StringUtils.joinPaths(this.channelsPrefix, 'getNotifications')
    // 通知已读
    static readonly READ_NOTIFICATION = StringUtils.joinPaths(this.channelsPrefix, 'readNotification')
    // 全部通知已读
    static readonly READ_ALL_NOTIFICATIONS = StringUtils.joinPaths(this.channelsPrefix, 'readAllNotifications')
    // 新增通知
    static ADD_NOTIFICATION = StringUtils.joinPaths(this.channelsPrefix, 'addNotification')
}
