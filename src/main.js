import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementPlus from 'element-plus';
import '@/style/index.scss';
import 'element-plus/dist/index.css';
import 'github-markdown-css';
import '@/style/vs.css';
import plugins from './plugins';

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(store);
app.use(plugins);

app.mount('#app');
