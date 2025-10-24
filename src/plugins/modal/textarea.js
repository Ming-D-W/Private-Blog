import { createApp } from 'vue';
import { ElDialog, ElInput } from 'element-plus';
import { debounce } from 'lodash';

let custOptions, instance, resolve, reject;
let defaults = {
	title: '提示',
	contentTitle: '',
	content: '',
	size: 'normal',
	maxlength: 200,
	showWordLimit: true,
	required: true,
	confirmText: '确认',
	cancelText: '取消',
	placeholder: '请输入内容',
};
let sizeWidths = {
	small: '400px',
	normal: '600px',
	large: '800px',
};
const initInstance = () => {
	const dom = document.createElement('div');
	document.body.appendChild(dom);
	const app = createApp({
		el: dom,
		data() {
			return {
				showModal: false,
				action: '',
				options: Object.assign({}, defaults, custOptions),
				text: '',
				btnLoading: false,
			};
		},
		computed: {
			confirmBtnDisabled({ options, text, isNotEmpty }) {
				const { validator, required } = options;
				return validator ? !validator(text) : required ? !isNotEmpty(text) : false;
			},
		},
		components: {
			ElDialog,
			ElInput,
		},
		render(h) {
			const {
				required,
				validator,
				label,
				confirmText,
				cancelText,
				maxlength,
				placeholder,
				showWordLimit,
				title,
				size,
			} = this.options;
			const redStarNode =
				required || validator ? h('span', { class: 'yx-color-danger' }, '*') : null;
			const labelNode = label
				? h('div', { class: 'color-gy-8 mr-16' }, [redStarNode, label])
				: null;
			const confirmBtnNode = h(
				'el-button',
				{
					props: { type: 'primary', disabled: this.confirmBtnDisabled, loading: this.btnLoading },
					on: { click: e => this.confirm(e) },
				},
				[confirmText],
			);
			const cancelBtnNode = h(
				'el-button',
				{
					props: { type: 'default' },
					on: { click: e => this.handleClose(e, 'cancel') },
				},
				[cancelText],
			);
			const btns = [cancelBtnNode, confirmBtnNode];
			const contentNode = this.showModal
				? h('div', { class: 'pt-8 pr-8 pl-8' }, [
						h('div', { class: 'flex-row flex-align-start' }, [
							labelNode,
							h(ElInput, {
								class: 'flex-1',
								attrs: { maxlength, placeholder, rows: 4 },
								props: { type: 'textarea', value: this.text, showWordLimit },
								on: { input: e => (this.text = e) },
							}),
						]),
				  ])
				: null;
			const footerNode = this.showModal ? h('span', { slot: 'footer' }, [...btns]) : null;
			return h(
				ElDialog,
				{
					props: {
						visible: this.showModal,
						title,
						width: sizeWidths[size],
						closeOnClickModal: false,
					},
					on: { close: e => this.doClose(e) },
				},
				[contentNode, footerNode],
			);
		},
		methods: {
			doClose() {
				this.showModal = false;
				custOptions = {};
				this.text = '';
				this.btnLoading = false;
				reject();
			},
			async handleClose(e, key) {
				this.action = key;
				resolve({ key: this.action, done: this.getSafeClose(), form: { text: this.text } });
			},
			getSafeClose() {
				return () => {
					this.$nextTick(() => {
						this.doClose();
					});
				};
			},
			confirm: debounce(function (e) {
				if (this.confirmBtnDisabled) {
					return;
				}
				this.btnLoading = true;
				this.handleClose(e, 'confirm');
			}, 300),
		},
	});
	instance = app.mount(dom);
};
const showMsg = () => {
	if (!instance) {
		initInstance();
	}
	// 重设当前的options，否则会参数无法更新
	instance.options = Object.assign({}, defaults, custOptions);
	instance.showModal = true;
	// 设置初始text的值
	instance.text = custOptions.value;
};

export default {
	show(options, rs, rj) {
		custOptions = options;
		resolve = rs;
		reject = rj;
		showMsg();
	},
};
