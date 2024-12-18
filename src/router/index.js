import Vue from "vue";
import VueRouter from "vue-router";

import Layout from "@/components/layout";
Vue.use(VueRouter);

const routes = [
  {
    path: "/", //根目录路由为/
    redirect: "/home", //重定向至/home页面
  },
  {
    path: "/home", //根目录路由为/
    name: "首页",
    component: Layout, //指定使用Layout组件布局
    redirect: "/home/home1", //重定向至/home页面
    children: [
      {
        path: "/home/home1",
        name: "首页1",
        component: () => import("@/views/home"),
      },
      {
        path: "/home/home2",
        name: "首页2",
        component: () => import("@/views/home2"),
      },
      {
        path: "/home/home3",
        name: "首页3",
        component: () => import("@/views/home"),
      },
    ],
  },

  {
    path: "/list",
    name: "达人CRM",
    component: Layout,
    redirect: "/list/list1",
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
];

const router = new VueRouter({
  routes,
});
export default router;
