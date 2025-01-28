import Vue from "vue";
import VueRouter from "vue-router";

import componentLibrary from "@/router/componentLibrary";
import { generateRoutes } from "@/router/interviewQuestion";
import { generateCommonRoutes } from "@/plugins/routingRuleTool";
Vue.use(VueRouter);
const mdFiles = require.context("@/views/interviewQuestion", true, /\.md$/);
const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  componentLibrary,
  generateRoutes(),
  generateCommonRoutes({
    mdFiles,
    basePath: "/list1",
    name: "面试题1",
  }),
];
const router = new VueRouter({
  routes,
});
export default router;
