import Layout from "@/components/layout/index.vue";

const componentLibrary = {
  path: "/home",
  name: "组件库",
  component: Layout,
  redirect: "/home/home1",
  children: [
    {
      path: "/home/home1",
      name: "首页1",
      component: () => import("@/views/empty.md"),
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
};
export default componentLibrary;
