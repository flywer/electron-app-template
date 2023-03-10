import type {App} from 'vue';
import {createRouter, createWebHashHistory} from 'vue-router';
import {routes} from './routes';

/* const {
    VITE_HASH_ROUTE = 'N',
    VITE_BASE_URL
} = import.meta.env; */

export const router = createRouter({
    //history: VITE_HASH_ROUTE === 'Y' ? createWebHashHistory(VITE_BASE_URL) : createWebHistory(VITE_BASE_URL),
    history: createWebHashHistory(),
    routes: routes,
    //scrollBehavior
});

/** setup vue router. - [安装vue路由] */
export async function setupRouter(app: App) {
    app.use(router);
    //createRouterGuard(router);
    await router.isReady();
}

export * from './routes';

