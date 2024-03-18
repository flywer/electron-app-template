import {RouteRecordRaw} from 'vue-router'
import App from "@render/App.vue"
import MainWindow from "@render/windows/MainWindow.vue";
import SettingWindow from "@render/windows/SettingWindow.vue";
import {StringUtils} from "@common/utils/StringUtils";
import HelloWorld from "@render/views/mainWindow/HelloWorld.vue";
import View2 from "@render/views/mainWindow/View2.vue";
import View3 from "@render/views/mainWindow/View3.vue";

export const routeName = {
    app: 'app',
    mainWindow: 'main-window',
    settingWindow: 'setting-window',
    helloWorld: 'hello-world',
    view2: 'view2',
    view3: 'view3',
}

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: routeName.app,
        component: App,
        children: [
            {
                name: routeName.mainWindow,
                path: routeName.mainWindow,
                component: MainWindow,
                children: [
                    {
                        name: routeName.helloWorld,
                        path: '/' + routeName.helloWorld,
                        component: HelloWorld
                    },
                    {
                        name: routeName.view2,
                        path: '/' + routeName.view2,
                        component: View2
                    },
                    {
                        name: routeName.view3,
                        path: '/' + routeName.view3,
                        component: View3
                    },
                ]
            },
            {
                name: routeName.settingWindow,
                path: routeName.settingWindow,
                component: SettingWindow,
            }
        ]
    }
]
