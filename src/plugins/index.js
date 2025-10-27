import Modal from '@/components/modal';
import DemoBlock from '@/components/demo-block/index.vue';

export default {
	install(app) {
		// 全局注册 demo-block 组件
		app.component('demo-block', DemoBlock);

		// 认证对象
		app.config.globalProperties.$modal = Modal;
		app.config.globalProperties.isNotEmpty = val =>
			!['', void 0, null, 'null'].includes(val);
	},
};
