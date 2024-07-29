import log from "electron-log";

/**
 * 全局错误处理器
 **/
export default class GlobalErrorHandler {
    public static handleError(error: Error): void {
        log.scope('GlobalErrorHandler').error(error.message);

        // 显示错误对话框
        // dialog.showErrorBox('An error occurred', error.message);
    }
}
