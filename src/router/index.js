import Vue from 'vue';
import VueRouter from 'vue-router';

import { interviewRouteConfig } from '@/router/interviewQuestion';
import { generateCommonRoutes } from '@/plugins/routingRuleTool';
import { componentLibrary } from '@/router/componentLibrary';
import Layout from '@/components/layout/index.vue';
Vue.use(VueRouter);
const routes = [
	{
		path: '/login',
		name: 'demo',
		component: Layout,
		children: [
			{
				path: '/login/jianli',
				name: '简历',
				component: () => import('@/views/about'),
			},
			{
				path: '/login/jianli1',
				name: '简历1',
				component: () => import('@/views/about'),
			},
		],
	},
	generateCommonRoutes(componentLibrary),
	generateCommonRoutes(interviewRouteConfig),
];
console.log(routes[0].children, 'routes');
console.log(routes[1].children, 'routes');
// 设置路由的重定向地址
const setRedirect = route => {
	if (route?.children?.length) {
		// 递归查找第一个没有子路由的路由路径
		route.redirect = setRedirect(route.children[0]);
	}
	return route.path;
};

// 对生成的路由设置重定向
routes.forEach(route => {
	if (route.children?.length) {
		setRedirect(route);
	}
});

// 动态获取第一个有效的重定向路径
const getFirstRedirectPath = routes => {
	for (const route of routes) {
		if (route.redirect) {
			return route.redirect; // 返回第一个有效的重定向路径
		}
		if (route.children?.length) {
			const childRedirect = getFirstRedirectPath(route.children);
			if (childRedirect) {
				return childRedirect; // 递归查找子路由的重定向路径
			}
		}
	}
	return null; // 如果没有找到重定向路径，返回 null
};

// 设置根路由重定向
const firstRedirectPath = getFirstRedirectPath(routes);
if (firstRedirectPath) {
	routes.push({
		path: '/',
		redirect: firstRedirectPath, // 动态设置根路由的重定向路径
		hidden: true,
	});
} else {
	// 如果没有找到有效的重定向路径，可以提供一个默认路径或抛出警告
	console.warn('No valid redirect path found for root route.');
	routes.push({
		path: '/',
		redirect: '/componentLibrary/empty', // 提供一个默认路径
		hidden: true,
	});
}

const router = new VueRouter({
	routes,
});
export default router;
