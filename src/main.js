import { createApp } from 'vue'
import Antd from 'ant-design-vue';
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import 'ant-design-vue/dist/reset.css';
import './assets/main.css'
// import * as icons from "@ant-design/icons-vue";


const app = createApp(App)
const pinia = createPinia()

app.use(router).use(pinia).use(Antd)

app.mount('#app')
/* for (const i in icons) {
  app.component(i, icons[i]);
} */
app.config.productionTip = false;
