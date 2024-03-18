import {createApp} from 'vue';
import naive from "naive-ui";
import App from './App.vue'
import {router} from "@render/router";
import {createPinia} from 'pinia';

// 全局样式
import '@render/styles/css/global.css'
// 全局tailwind样式
import '@render/styles/css/tailwind.css'

createApp(App)
    .use(router)
    .use(naive)
    .use(createPinia())
    .mount('#app')
