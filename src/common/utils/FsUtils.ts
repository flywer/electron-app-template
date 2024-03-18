import * as fs from "fs";
import {promisify} from "util";
import path from "path";

export class FsUtils {

    /**
     * 计算文件路径下文件大小
     **/
    public static calculateSize = async (dirPath: string, callback: (error: any, size: number) => void) => {

        // 使用promisify方法来promise化指定方法
        const stat = promisify(fs.stat)
        const readdir = promisify(fs.readdir)

        let fileSize = 0;
        let error = null

        async function calc(dirPath: string) {
            try {
                const statObj = await stat(dirPath)
                if (statObj.isDirectory()) {
                    const files = await readdir(dirPath)
                    let dirs = files.map(item => {
                        return path.join(dirPath, item)
                    })
                    let index = 0

                    async function next() {
                        if (index < dirs.length) {
                            let current = dirs[index++]
                            await calc(current)
                            await next()
                        }
                    }

                    return await next()
                } else {
                    fileSize += statObj.size
                }
            } catch (err) {
                error = err
            }
        }

        await calc(dirPath)
        callback(error, fileSize)
    }

    /**
     * 字节格式转换
     **/
    public static formatBytes = (bytes: number, decimals = 2) => {
        if (bytes === 0) return '0 Bytes';

        const k = 1024; // 或者使用 1000，这取决于你希望以1000为基数还是1024为基数
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
}
