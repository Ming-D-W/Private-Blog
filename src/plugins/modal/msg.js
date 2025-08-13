/*
 * @Descripttion:
 * @Version: 1.0.0
 * @Author: Li Yong
 * @Date: 2022-11-06 22:59:55
 * @LastEditors: 陈红伟 chenhw2019@gmail.com
 * @LastEditTime: 2023-11-13 10:45:30
 */

import Vue from 'vue';
import MsgModal from './MsgModal.vue';

let instance, resolve, reject;
let defaults = {
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
};

const initInstance = () => {
	const MsgModalConstructor = Vue.extend(MsgModal);
	instance = new MsgModalConstructor({
		el: document.createElement('div'),
	});

	// 监听组件事件
	instance.$on('action', result => {
		resolve(result);
	});

	instance.$on('close', () => {
		reject();
	});

	// 将组件添加到 body
	document.body.appendChild(instance.$el);
};

const showMsg = options => {
	if (!instance) {
		initInstance();
	}

	// 合并配置选项
	const mergedOptions = Object.assign({}, defaults, options);
	instance.options = mergedOptions;

	// 显示模态框
	Vue.nextTick(() => {
		instance.show();
	});
};

export default {
	show(options, rs, rj) {
		resolve = rs;
		reject = rj;
		showMsg(options);
	},
};
