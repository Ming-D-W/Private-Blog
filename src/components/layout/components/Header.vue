<template>
	<div class="flex-row flex-just-end">
		<div
			class="side-item"
			:class="checkIsActive(item.path)"
			v-for="item in listMenus"
			:key="item.path"
			@click="menuClickHandle(item.path)"
		>
			{{ item.name }}
		</div>
	</div>
</template>

<script>
export default {
	name: '',
	props: {
		listMenus: {
			type: Array,
			default: () => [],
		},
	},
	components: {},
	data() {
		return {
			activeIndex: '0',
		};
	},
	computed: {
		activePath() {
			const matchedPath = [...this.$route.matched];
			const path = matchedPath.map(item => item.path);
			return path;
		},
	},
	watch: {
		activePath(val) {
			this.setSubMenuList(val);
		},
	},
	created() {
		this.setSubMenuList(this.$route.matched.map(item => item.path));
	},
	methods: {
		menuClickHandle(path) {
			if (this.activePath.includes(path)) {
				return;
			}
			this.$router.push(path);
		},
		checkIsActive(path) {
			return this.activePath.includes(path) ? 'active' : '';
		},
		setSubMenuList(val) {
			this.$emit('select', this.listMenus.find(item => val.includes(item.path)).path);
		},
	},
};
</script>

<style scoped lang="scss">
.right-aligned {
	//background-color: #e0fc58;
	border-radius: 8px;
	display: flex;
	justify-content: end;
}
.side-item {
	font-family: PingFang SC;
	position: relative;
	padding: 22px 14px;
	font-size: 14px;
	//color: $color-text-primary;
	font-weight: 400;
	cursor: pointer;
	&:hover {
		color: #7052ff;
	}
	&.active {
		color: #7052ff;
		font-weight: 500;
	}
	&.active:after {
		content: '';
		height: 3px;
		background-color: #7052ff;
		width: 16px;
		position: absolute;
		bottom: 3px;
		left: 50%;
		margin-left: -8px;
		border-radius: 3px;
	}
}
</style>
