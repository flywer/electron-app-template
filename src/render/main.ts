import {createApp} from 'vue';
import naive from "naive-ui";
import App from './App.vue'
import {router} from "@render/router";
// 通用字体
import 'vfonts/Lato.css'
// 全局样式
import '@render/styles/css/global.css'

createApp(App)
    .use(naive)
    .use(router)
    .mount('#app')
