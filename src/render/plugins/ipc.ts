import {getCurrentInstance, onUnmounted, toRaw} from 'vue'

const {ipcRenderer} = window

interface IpcInstance {
    send: <T = any>(target: string, ...args: any[]) => Promise<T>
    on: (event: string, callback: (...args: any[]) => void) => void
}

export const ipcInstance: IpcInstance = {
    send: <T = any>(target: { toString: () => string }, ...args: any[]) => {
        const payloads: any[] = args.map(e => toRaw(e))
        return ipcRenderer.invoke(target.toString(), ...payloads)
    },
    on: (event, callback) => {
        ipcRenderer.on(event.toString(), (e, ...args) => {
            callback(...args)
        })

        // Use tryOnUnmounted if you use @vueuse https://vueuse.org/shared/tryOnUnmounted/
        if (getCurrentInstance()) {
            onUnmounted(() => {
                ipcRenderer.removeAllListeners(event.toString())
            })
        }
    },
}

export function useIpc() {
    return ipcInstance
}
