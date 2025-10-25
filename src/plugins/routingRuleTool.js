import Layout from '@/components/layout/index.vue';

/**
 * 通用路由生成方法
 * @param {Object} mdFiles import.meta.glob 的结果
 * @param {string} basePath 基础路径
 * @param {string} name 路由名称
 * @returns {Object} 路由配置对象
 */
export function generateCommonRoutes({ mdFiles, basePath, name }) {
	const routes = Object.entries(mdFiles).map(([filePath, importFn]) => {
		// filePath 格式: '/src/views/componentLibrary/empty.md'
		// 提取文件名部分
		const fileName = filePath.split('/').pop(); // 'empty.md' 或 'index1.vue'
		const routePath = fileName.replace(/\.md$/, '').replace(/\.vue$/, '');
		// 去掉路径开头的数字和点,将路径中的斜杠 / 替换为连字符 -，将空格和特殊字符(&)替换为连字符
		let routeName = routePath.replace(/^\d+\./, '').replace(/\//g, '-').replace(/[\s&]+/g, '-');

		// 对中文字符进行 URL 编码，确保路由路径与浏览器 URL 一致
		routeName = encodeURIComponent(routeName);

		return {
			path: `${basePath}/${routeName}`,
			name: decodeURIComponent(routeName), // name 使用解码后的值，方便调试
			component: importFn, // importFn 已经是一个返回 Promise 的函数
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
