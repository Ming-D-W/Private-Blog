import { createRouter, createWebHashHistory } from 'vue-router';

import { interviewRouteConfig } from '@/router/modules/interview-question.routes';
import { generateCommonRoutes } from '@/plugins/routingRuleTool';
import { componentLibrary } from '@/router/modules/component-library.routes';
import Layout from '@/components/layout/index.vue';

const routes = [
	generateCommonRoutes(interviewRouteConfig),
	generateCommonRoutes(componentLibrary),
	{
		path: '/resume',
		name: '简历',
		component: Layout,
		children: [
			{
				path: '/resume/resume1',
				name: '简历1',
				component: () => import('@/views/resume/index.vue'),
			},
		],
	},
];

/**
 * 递归设置路由重定向并返回第一个叶子路由路径
 * @param {Object} route - 路由对象
 * @returns {string} 第一个叶子路由的路径
 */
const setRedirectAndGetFirstPath = route => {
	if (route?.children?.length) {
		// 递归查找第一个没有子路由的路由路径
		const firstChildPath = setRedirectAndGetFirstPath(route.children[0]);
		route.redirect = firstChildPath;
		return firstChildPath;
	}
	return route.path;
};

// 对生成的路由设置重定向
routes.forEach(route => {
	if (route.children?.length) {
		setRedirectAndGetFirstPath(route);
	}
});

// 获取第一个有效的重定向路径作为根路由重定向
const firstRedirectPath = routes.find(route => route.redirect)?.redirect;

// 设置根路由重定向
routes.push({
	path: '/',
	redirect: firstRedirectPath || '/componentLibrary/empty', // 动态设置根路由的重定向路径
	hidden: true,
});

const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

export default router;
