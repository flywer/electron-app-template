import {RouteRecordRaw} from 'vue-router'
import App from "@render/App.vue"
import MainWindow from "@render/windows/MainWindow.vue";
import SettingWindow from "@render/windows/SettingWindow.vue";
import HelloWorld from "@render/views/mainWindow/HelloWorld.vue";
import View2 from "@render/views/mainWindow/View2.vue";
import View3 from "@render/views/mainWindow/View3.vue";
import {RouteName} from "@common/constants/app/RouteName";

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: RouteName.app,
        component: App,
        children: [
            {
                name: RouteName.mainWindow,
                path: RouteName.mainWindow,
                component: MainWindow,
                children: [
                    {
                        name: RouteName.helloWorld,
                        path: '/' + RouteName.helloWorld,
                        component: HelloWorld
                    },
                    {
                        name: RouteName.view2,
                        path: '/' + RouteName.view2,
                        component: View2
                    },
                    {
                        name: RouteName.view3,
                        path: '/' + RouteName.view3,
                        component: View3
                    },
                ]
            },
            {
                name: RouteName.settingWindow,
                path: RouteName.settingWindow,
                component: SettingWindow,
            }
        ]
    }
]
