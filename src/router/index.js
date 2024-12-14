import Vue from "vue";
import VueRouter from "vue-router";

import Layout from "@/components/layout";
Vue.use(VueRouter);

const routes = [
  {
    path: "/", //根目录路由为/
    component: Layout, //指定使用Layout组件布局
    redirect: "/home", //重定向至/home页面
    children: [
      {
        //子菜单信息
        path: "/home", //路径
        name: "首页",
        component: null, //指定组件
        redirect: "/home/home1",
        children: [
          {
            path: "/home/home1",
            name: "首页1",
            component: () => import("@/views/home"),
          },
          {
            path: "/home/home2",
            name: "首页2",
            component: () => import("@/views/home"),
          },
        ],
      },
    ],
  },
  {
    path: "/list",
    component: Layout,
    children: [
      {
        path: "/list",
        name: "list管理",
        component: null,
        children: [
          {
            path: "/list/list1",
            name: "list列表1",
            component: () => import("@/views/about"),
          },
          {
            path: "/list/list2",
            name: "list列表2",
            component: () => import("@/views/about"),
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});
console.log(router);
export default router;
