/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2022-11-06 22:59:55
 * @LastEditors: 陈红伟 chenhw2019@gmail.com
 * @LastEditTime: 2023-11-13 10:45:30
 */

import { createApp, reactive } from 'vue';
import MsgModal from './MsgModal.vue';
import ElementPlus from 'element-plus';

let instance, app, resolve, reject;
let reactiveOptions = reactive({
	title: '提示',
	contentTitle: '',
	content: '',
	size: 'normal',
	btns: [
		{
			type: 'default',
			text: '取消',
			key: 'cancel',
		},
		{
			type: 'primary',
			text: '确认',
			key: 'confirm',
		},
	],
});

const initInstance = () => {
	const container = document.createElement('div');
	document.body.appendChild(container);

	app = createApp(MsgModal, {
		options: reactiveOptions,
		onAction: result => {
			resolve(result);
		},
		onClose: () => {
			reject();
		},
	});

	// 注册 Element Plus
	app.use(ElementPlus);

	instance = app.mount(container);
};

const showMsg = options => {
	if (!instance) {
		initInstance();
	}

	// 更新响应式对象的属性
	Object.keys(options).forEach(key => {
		reactiveOptions[key] = options[key];
	});

	// 显示模态框
	instance.show();
};

export default {
	show(options, rs, rj) {
		resolve = rs;
		reject = rj;
		showMsg(options);
	},
};
