<template>
	<div>
		<el-container>
			<el-header>
				<!-- 头部 -->
				<HeadBar :listMenus="listMenus" @select="menuClickHandle"></HeadBar>
			</el-header>
			<el-main class="demo-content">
				<!-- 内容区域 -->
				<AppMain :sideMenu="sideMenu"></AppMain>
			</el-main>
		</el-container>
	</div>
</template>

<script>
import { HeadBar, SlideBar, AppMain } from './components';
export default {
	data() {
		return { listMenus: [], sideMenu: [] };
	},
	components: {
		HeadBar,
		SlideBar,
		AppMain,
	},
	created() {
		this.routingProcess();
	},
	methods: {
		routingProcess() {
			this.listMenus = this.$router.options.routes;
		},
		findChildRoutes(routes, targetPath) {
			const result = [];
			// 递归遍历路由配置
			function traverse(routes) {
				for (const route of routes) {
					if (route.path === targetPath && route.children) {
						// 找到匹配路径并提取 children
						result.push(...route.children);
					}
					// 如果有子路由，递归处理
					if (route.children) {
						traverse(route.children);
					}
				}
			}
			traverse(routes);
			return result;
		},
		menuClickHandle(path) {
			this.sideMenu = this.findChildRoutes(this.$router.options.routes, path);
		},
	},
};
</script>

<style scoped lang="scss">
$header_height_px: 64px;
$page_min_width_px: 1366px;
$menu-width: 132px;
$border_color_extra_light: #ebebeb; // 假设这个颜色值

::-webkit-scrollbar {
	display: none;
}

.el-container {
	min-height: 100vh;
}

.demo-content {
	min-height: calc(100vh - $header_height_px);
	margin-top: $header_height_px; /* 为固定的 header 留出空间 */
	padding: 0;
}

:deep(.el-container) {
	.el-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		padding: 0;
		min-width: $page_min_width_px;
		height: $header_height_px !important;
		border-bottom: 1px solid $border_color_extra_light;
		background-color: #ffffff; /* 确保背景不透明 */
	}

	.el-main {
		padding: 0;
	}

	.page-content {
		margin: 16px 16px 0 16px;
		padding: 0;
		border-radius: 8px 8px 0 0;
		position: relative;
	}

	.el-menu {
		border-right: none;
	}
}
</style>
