import Layout from "@/components/layout/index.vue";

/**
 * 通用路由生成方法
 * @param {Object} mdFiles require.context 的结果
 * @param {string} basePath 基础路径
 * @param {string} name 路由名称
 * @returns {Object} 路由配置对象
 */
export function generateCommonRoutes({ mdFiles, basePath, name }) {
  const routes = mdFiles.keys().map((filePath) => {
    const routePath = filePath.replace(/^\.\//, "").replace(/\.md$/, "");
    const routeName = routePath.replace(/^\d+\./, "").replace(/\//g, "-");
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
