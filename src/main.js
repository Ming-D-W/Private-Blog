import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import '@/style/index.scss';
import 'element-plus/dist/index.css';
import '@/style/markdown-vue-theme.scss';
// 引入自定义 highlight.js 主题（基于 Typora OneDark 配色）
import '@/style/highlight-typora-onedark.css';
import plugins from './plugins';
import { createHead } from '@unhead/vue/client';

const app = createApp(App);
const head = createHead();

app.use(ElementPlus);
app.use(router);
app.use(store);
app.use(plugins);
app.use(head);

app.mount('#app');
