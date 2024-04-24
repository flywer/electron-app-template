import {defineStore} from "pinia";

export const useStatusBarStore = defineStore({
    id: 'statusBar',
    state: () => ({
        // 显示通知栏
        notificationManagerShow: false as boolean,
        // 显示任务执行管理器
        taskExecManagerShow: false as boolean,
    }),
    actions: {
        allHidden() {
            this.notificationManagerShow = false
            this.taskExecManagerShow = false
        }
    }
})
