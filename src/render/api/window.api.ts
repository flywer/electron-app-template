import {ipcInstance} from '@render/plugins'


/**
 * @description: 主窗口设置
 * @author: wangcb
 * @date: 2023/3/3 15:15
 **/
export const set_window = (setup: any, options: any) => {
    /*return ipcInstance.send<string>(channel.app.window.setWindow, setup, options);*/
    console.log(setup)
}

interface s {

}

export enum Enum {
    asd = '2',
}
