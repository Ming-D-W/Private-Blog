<template>
	<div id="write" class="app-main-container" :class="{ 'with-toc': showTOC }">
		<div class="content-area">
			<router-view></router-view>
		</div>
		<TableOfContents v-if="showTOC" />
	</div>
</template>

<script>
import TableOfContents from './TableOfContents.vue';

export default {
	name: 'AppMain',
	components: {
		TableOfContents,
	},
	data() {
		return {};
	},
	computed: {
		showTOC() {
			// 根据路由 meta 判断是否显示 TOC
			return this.$route.meta?.isMarkdown === true;
		},
	},
};
</script>

<style scoped lang="scss">
.app-main-container {
	box-sizing: border-box;
	background: #ffffff;
	padding: 24px;
	min-height: calc(100vh - 60px); /* 减去 header 高度 */

	&.with-toc {
		display: flex;
		gap: 24px;
		align-items: flex-start;
	}
}

.content-area {
	flex: 1;
	min-width: 0; /* 防止 flex 子元素溢出 */
	max-width: 100%;

	.with-toc & {
		max-width: calc(100% - 274px); /* 250px TOC + 24px gap */
	}
}

/* 移动端适配 */
@media (max-width: 767px) {
	.app-main-container {
		padding: 16px;

		&.with-toc {
			display: block;
		}
	}

	.content-area {
		.with-toc & {
			max-width: 100%;
		}
	}
}
</style>
