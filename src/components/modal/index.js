/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2023-09-04 11:38:38
 * @LastEditors: Li Yong
 * @LastEditTime: 2023-09-04 11:49:39
 */
import MsgModal from './msg';
import TextareaModal from './textarea';
const Modal = function (options) {
	// Vue 3 中没有 $isServer，在浏览器环境中直接跳过检查
	if (typeof window === 'undefined') return;
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
