import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ElementUI from 'element-ui';
import '@/style/index.scss';
import 'element-ui/lib/theme-chalk/index.css';
import 'github-markdown-css';
import '@/style/vs.css';
import plugins from './plugins';

Vue.use(ElementUI);
Vue.use(plugins);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app');
