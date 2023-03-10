import {RouteRecordRaw} from 'vue-router'

const view1 = () => import('@render/views/examples/view1.vue')
const view2 = () => import ('@render/views/examples/view2.vue')
export const routeName = {
    view1: 'view1',
    view2: 'view2',
}

export const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        redirect: '/examples',
    },
    {
        path: '/examples',
        name: routeName.view1,
        component: view1,
    },
    {
        name: routeName.view2,
        path: '/shell/terminal',
        component: view2
    }
]
