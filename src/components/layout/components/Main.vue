<template>
	<div id="write" class="app-main-container">
		<SlideBar :sideMenu="sideMenu" />
		<div class="content-wrapper" :class="{ 'with-toc': showTOC }">
			<div class="content-area">
				<router-view></router-view>
			</div>
			<TableOfContents v-if="showTOC" />
		</div>
	</div>
</template>

<script>
import TableOfContents from './TableOfContents.vue';
import SlideBar from './Sidebar.vue';

export default {
	name: 'AppMain',
	components: {
		TableOfContents,
		SlideBar,
	},
	props: {
		sideMenu: {
			type: Array,
			default: () => [],
		},
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
	min-height: calc(100vh - 64px); /* 减去 header 高度 */
	padding: 24px;
	/* SlideBar 使用 fixed 定位，需要为它留出空间 */
	margin-left: 200px; /* 为 SlideBar 留出空间 */
}

.content-wrapper {
	max-width: 100%;

	&.with-toc {
		/* TOC 使用 fixed 定位，需要为它留出空间 */
		margin-right: 274px; /* 250px TOC + 24px 间距 */
	}
}

.content-area {
	max-width: 100%;
}

/* 移动端适配 */
@media (max-width: 767px) {
	.app-main-container {
		flex-direction: column;
	}

	.content-wrapper {
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
