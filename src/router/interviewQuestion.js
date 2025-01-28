import Layout from "@/components/layout/index.vue";

// 使用 require.context 获取所有 .md 文件
const mdFiles = require.context(
  "@/views/interviewQuestion", // 目录路径
  true, // 是否遍历子目录
  /\.md$/ // 匹配文件的正则表达式
);
console.log(mdFiles, 333333333111111);
// 生成路由配置
export function generateRoutes() {
  const routes = mdFiles.keys().map((filePath) => {
    // 去除开头的 ./ 和结尾的 .md
    const routePath = filePath.replace(/^\.\//, "").replace(/\.md$/, "");
    const routeName = routePath.replace(/^\d+\./, "").replace(/\//g, "-");
    console.log(`@/views/interviewQuestion/${routePath}.md`, "viewPath1");

    return {
      path: `/list/${routeName}`,
      name: routeName,
      component: () => import(`@/views/interviewQuestion/${routePath}.md`),
    };
  });

  return {
    path: "/list",
    name: "面试题",
    component: Layout,
    redirect: routes.length > 0 ? routes[0].path : "/list",
    children: routes,
  };
}
