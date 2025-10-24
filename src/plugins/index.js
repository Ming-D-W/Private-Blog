import Modal from './modal';

export default {
	install(app) {
		// 认证对象
		app.config.globalProperties.$modal = Modal;
		app.config.globalProperties.isNotEmpty = val =>
			!['', void 0, null, 'null'].includes(val);
	},
};
