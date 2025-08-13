/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-09-04 11:38:38
 * @LastEditors: Li Yong
 * @LastEditTime: 2023-09-04 11:49:39
 */
import Vue from 'vue';
import MsgModal from './msg';
import TextareaModal from './textarea';
const Modal = function (options) {
	if (Vue.prototype.$isServer) return;
	const { type = 'info' } = options;
	const modals = {
		info: MsgModal,
		textarea: TextareaModal,
	};
	return new Promise((rs, rj) => {
		modals[type].show(options, rs, rj);
	});
};

export default Modal;
