import {StringUtils} from "@common/utils/StringUtils";

export class WindowApiChannel {
    private static channelsPrefix = 'window'

    // 获取窗口ID
    static readonly GET_WEB_CONTENTS_ID = StringUtils.joinPaths(this.channelsPrefix, 'getWebContentsId')
    // 获取窗口WebContents
    static readonly GET_WEB_CONTENTS = StringUtils.joinPaths(this.channelsPrefix, 'getWebContents')
    // 窗口最小化
    static readonly MINIMIZE = StringUtils.joinPaths(this.channelsPrefix, 'minimize')
    // 窗口最大化
    static readonly MAXIMIZE = StringUtils.joinPaths(this.channelsPrefix, 'maximize')
    // 窗口关闭
    static readonly CLOSE = StringUtils.joinPaths(this.channelsPrefix, 'close')
    // 窗口置顶
    static readonly TOP = StringUtils.joinPaths(this.channelsPrefix, 'top')
    // 创建窗口
    static readonly CREATE_WINDOW = StringUtils.joinPaths(this.channelsPrefix, 'createWindow')
}
