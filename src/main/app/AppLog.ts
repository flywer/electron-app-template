import Path from "path";
import log from 'electron-log/main'
import {AppConstant} from "@common/constants/app/AppConstant";
import {DateUtils} from "@common/utils/DateUtils";

// 应用日志管理
export class AppLog {
    // 设置日志存储位置
    static readonly LOG_PATH = Path.join(Path.join(AppConstant.APP_TEMP_DATA_PATH, 'logs'), DateUtils.getDayString() + '.log')

    /**
     * 应用日志模块初始化
     */
    static appLogInit = () => {
        try {
            log.initialize()

            // 根据日期来存日志
            log.transports.file.resolvePathFn = () => this.LOG_PATH
        } catch (e) {
            console.error(e)
        }
    }

}
