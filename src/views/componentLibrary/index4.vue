<template>
	<div class="flex-row">
		<div class="f">
			<div class="c">
				<p>11111</p>
				<el-button @click="btn">11</el-button>
				<el-button @click="btn2">22</el-button>
				<el-button @click="testInfoModal">测试Info模态框</el-button>
				<el-button @click="btn3">33</el-button>
			</div>
		</div>
		<div class="f ml-20">
			<div class="c"></div>
			<div class="c"></div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			list: [1, 2, 3],
		};
	},
	mounted() {},
	methods: {
		btn() {
			this.$modal({
				type: 'info',
				title: '提示',
				content: 'btnText',
				size: 'small',
				btns: [
					{
						type: 'default',
						text: '取消',
						key: 'cancel',
					},
					{
						type: 'primary',
						text: `确认`,
						key: 'confirm',
					},
				],
			})
				.then(() => {})
				.catch(() => {});
		},
		btn2() {
			this.$modal({
				title: '备注',
				type: 'textarea',
				size: 'small',
				label: '备注内容',
				maxlength: 100,
				value: '11111111',
			}).then(async res => {
				if (res.key == 'confirm') {
					// 请求失败时
					this.$message.success('操作成功');
					res.done();
				} else {
					res.done();
				}
			});
		},
		testInfoModal() {
			this.$modal({
				title: '测试声明式组件',
				contentTitle: '重要提示',
				content: '这是一个测试声明式组件改写后的模态框，功能和样式应该与原组件完全一致。',
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
			})
				.then(res => {
					if (res.key === 'confirm') {
						this.$message.success('确认成功！声明式组件工作正常');
					}
					res.done();
				})
				.catch(() => {
					this.$message.info('取消操作');
				});
		},
	},
};
</script>

<style scoped>
.f {
	height: 400px;
	width: 400px;
	background-color: #00a982;
	/*border: 2px solid;*/
}
.c {
	height: 200px;
	width: 200px;
	/*border: 2px solid;*/
	background-color: #000000;
	margin-top: 10px;
	line-height: 200px;
	text-align: right;
	&:first-child {
		margin-top: 0;
		background-color: #d6513f;
		/*visibility: hidden;*/
	}

	&::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 10px;
		height: 10px;
		background-color: #cdfa67;
	}
}
</style>
