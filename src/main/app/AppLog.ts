import Path from "path";
import log from 'electron-log/main'
import {AppConstant} from "@common/constants/app/AppConstant";
import {DateUtils} from "@common/utils/DateUtils";
import * as colors from "colorette";
import Logger from "electron-log";
import {isEmpty} from "lodash";

/**
 * 应用日志模块
 **/
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
            // 设置日志级别
            log.transports.file.level = global.logLevel;

            log.transports.console.format = '{text}';

            // 将控制台输出文本格式化
            log.hooks.push((message, transport) => {
                let text = null;

                if (transport !== log.transports.console) {
                    return message;
                }

                // 克隆消息和数据，因为它们由不同的人共享
                const newMessage = Object.assign({}, message);
                const {data, date, level, scope} = newMessage;
                const dataClone = [...data];

                if (typeof dataClone[0] === 'string') {
                    text = dataClone[0];
                } else {
                    text = JSON.stringify(dataClone[0]);
                }

                // 构建准备好输出的字符串
                const colorizeText = this.colorize(level, text);
                // 日志等级
                const levelStr = this.makeLabel(level, level);
                // 进程类型，分主进程和渲染进程
                const processType = this.makeLabel(newMessage.variables.processType, level);
                // 作用域
                const scopeStr = this.makeLabel(scope, level);
                // 时间
                const formattedTime = date.toTimeString().substring(0, 8);

                dataClone[0] = `${formattedTime} ${levelStr} ${processType} ${scopeStr} ${colorizeText}`;
                newMessage.data = dataClone;

                return newMessage;
            });

            // 捕获未处理的异常
            log.errorHandler.startCatching({showDialog: false});

            // 记录Electron事件日志
            log.eventLogger.startLogging();

            log.initialize({preload: true});

            // 覆写console
            Object.assign(console, log.functions);
            log.scope('logger').info('日志模块初始化成功')
        } catch (e) {
            log.error("日志模块初始化异常", e)
        }
    }

    // 根据日志类型着色
    static colorize(type: Logger.LogLevel, data: any) {
        const color
            = type === 'info'
            ? 'blue'
            : type === 'error'
                ? 'red'
                : type === 'warn'
                    ? 'yellow'
                    : 'green'
        return colors[color](data)
    }

    // 生成日志标签
    static makeLabel(name: string, type?: Logger.LogLevel) {
        if (!isEmpty(name)) {
            return `${colors.dim('[')}${type ? this.colorize(type, name) : name}${colors.dim(']')}`
        } else {
            return ''
        }
    }
}
