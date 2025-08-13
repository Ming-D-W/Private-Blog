<template>
	<el-dialog
		:visible.sync="visible"
		:title="options.title"
		:width="sizeWidths[options.size]"
		@close="doClose"
	>
		<!-- 内容区域 -->
		<div v-if="visible" class="pt-8 pr-8 pl-8">
			<!-- 带图标的内容标题 -->
			<template v-if="options.contentTitle">
				<i class="el-icon-info yx-color-warning fz-16 mr-4"></i>
				<span class="font-h4-medium yx-color-text-primary">{{ options.contentTitle }}</span>
			</template>

			<!-- 内容文本 -->
			<p
				:class="`pre-wrap font-h4-regular mt-8 yx-color-text-primary ${
					options.contentTitle ? 'ml-20' : ''
				}`"
			>
				{{ options.content }}
			</p>
		</div>

		<!-- 底部按钮 -->
		<span v-if="visible" slot="footer">
			<el-button
				v-for="btn in options.btns"
				:key="btn.key"
				:type="btn.type"
				@click="handleClose($event, btn.key)"
			>
				{{ btn.text }}
			</el-button>
		</span>
	</el-dialog>
</template>

<script>
export default {
	name: 'MsgModal',
	props: {
		options: {
			type: Object,
			default: () => ({
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
			}),
		},
	},
	data() {
		return {
			visible: false,
			action: '',
			sizeWidths: {
				small: '400px',
				normal: '600px',
				large: '800px',
			},
		};
	},
	methods: {
		show() {
			this.visible = true;
		},
		doClose() {
			this.visible = false;
			this.action = '';
			this.$emit('close');
		},
		handleClose(e, key) {
			this.action = key;
			this.$emit('action', { key: this.action, done: this.getSafeClose() });
		},
		getSafeClose() {
			return () => {
				this.$nextTick(() => {
					this.doClose();
				});
			};
		},
	},
};
</script>
