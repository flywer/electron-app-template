import {StringUtils} from "@common/utils/StringUtils";

export class AppNotificationChannel {
    private static channelsPrefix = 'appNotification'

    // 获取通知
    static readonly GET_NOTIFICATIONS = StringUtils.joinPaths(this.channelsPrefix, 'getNotifications')
    // 通知已读
    static readonly READ_NOTIFICATION = StringUtils.joinPaths(this.channelsPrefix, 'readNotification')
    // 通知清楚
    static readonly CLEAR_NOTIFICATION = StringUtils.joinPaths(this.channelsPrefix, 'clearNotification')
    // 全部通知d清楚
    static readonly CLEAR_ALL_NOTIFICATIONS = StringUtils.joinPaths(this.channelsPrefix, 'clearAllNotifications')
    // 全部通知已读
    static readonly READ_ALL_NOTIFICATIONS = StringUtils.joinPaths(this.channelsPrefix, 'readAllNotifications')
    // 新增通知
    static readonly ADD_NOTIFICATION = StringUtils.joinPaths(this.channelsPrefix, 'addNotification')
    // 发送主进程通知到渲染进程
    static readonly SEND_MAIN_NOTIFICATION = StringUtils.joinPaths(this.channelsPrefix, 'sendMainNotification')
    // 主进程新增通知
    static readonly ADD_MAIN_NOTIFICATION = StringUtils.joinPaths(this.channelsPrefix, 'addMainNotification')
}
