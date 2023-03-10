import {createApp} from 'vue';
import naive from "naive-ui";
import App from './App.vue'

// 通用字体
import 'vfonts/Lato.css'

createApp(App)
    .use(naive)
    .mount('#app')
