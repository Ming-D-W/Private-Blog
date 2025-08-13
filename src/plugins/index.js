import Modal from './modal';
export default {
	install(Vue) {
		// 认证对象
		Vue.prototype.$modal = Modal;
		Vue.prototype.isNotEmpty = val => !['', void 0, null, 'null'].includes(val);
	},
};
