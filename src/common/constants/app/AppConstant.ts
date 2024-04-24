import {join} from "node:path";
import os from "node:os";

export class AppConstant {
    // 应用名称
    static readonly APP_NAME = "ElectronAppTemplate"

    // 系统盘应用存储位置
    static readonly APP_DATA_PATH = join(os.homedir(), `/AppData/Local/${this.APP_NAME}`)

    // 系统盘临时文件存储位置
    static readonly APP_TEMP_DATA_PATH = join(os.tmpdir(), this.APP_NAME)

    // 应用源文件存储位置
    static readonly APP_RESOURCE_PATH = !process["env"]["NODE_ENV"] || process["env"]["NODE_ENV"] === "production"
        ? process.resourcesPath // 生产
        : process.cwd(); // 开发

    // 应用设置存储位置
    static readonly APP_CONFIG_PATH = join(this.APP_DATA_PATH, 'config', 'app.json')

    // 应用外部引入资源位置
    static readonly APP_EXTERNAL_ASSETS_PATH = join(this.APP_RESOURCE_PATH, 'assets')

}
