import Layout from '@/components/layout/index.vue';

/**
 * 通用路由生成方法
 * @param {Object} mdFiles require.context 的结果
 * @param {string} basePath 基础路径
 * @param {string} name 路由名称
 * @returns {Object} 路由配置对象
 */
export function generateCommonRoutes({ mdFiles, basePath, name }) {
	console.log(mdFiles.keys(), 'mdFiles.keys()');
	const routes = mdFiles.keys().map(filePath => {
		// 去掉路径开头的 ./,去掉路径末尾的 .md 扩展名
		const routePath = filePath.replace(/^\.\//, '').replace(/\.md$/, '');
		// 去掉路径开头的数字和点,将路径中的斜杠 / 替换为连字符 -，以生成适合作为路由名称的字符串。
		const routeName = routePath.replace(/^\d+\./, '').replace(/\//g, '-');
		return {
			path: `${basePath}/${routeName}`,
			name: routeName,
			component: () => Promise.resolve(mdFiles(filePath).default),
		};
	});

	return {
		path: basePath,
		name: name,
		component: Layout,
		redirect: routes.length > 0 ? routes[0].path : basePath,
		children: routes,
	};
}
