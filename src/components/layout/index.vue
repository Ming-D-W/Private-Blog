<template>
  <div>
    <el-container>
      <el-header>
        <!-- 头部 -->
        <HeadBar :listMenus="listMenus" @select="menuClickHandle"></HeadBar>
      </el-header>
      <el-container>
        <el-aside>
          <!-- 左侧区域 -->
          <SlideBar :sideMenu="sideMenu"></SlideBar>
        </el-aside>
        <el-main>
          <!-- 内容区域 -->
          <AppMain></AppMain>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { HeadBar, SlideBar, AppMain } from "./components";
export default {
  data() {
    return { listMenus: [], sideMenu: [] };
  },
  components: {
    HeadBar,
    SlideBar,
    AppMain,
  },
  created() {
    this.routingProcess();
  },
  methods: {
    routingProcess() {
      this.listMenus = this.$router.options.routes;
    },
    findChildRoutes(routes, targetPath) {
      const result = [];
      // 递归遍历路由配置
      function traverse(routes) {
        for (const route of routes) {
          if (route.path === targetPath && route.children) {
            // 找到匹配路径并提取 children
            result.push(...route.children);
          }
          // 如果有子路由，递归处理
          if (route.children) {
            traverse(route.children);
          }
        }
      }
      traverse(routes);
      return result;
    },
    menuClickHandle(path) {
      this.sideMenu = this.findChildRoutes(this.$router.options.routes, path);
    },
  },
};
</script>

<style scoped lang="scss">
$header_height_px: 64px;
$page_min_width_px: 1366px;
$menu-width: 132px;
$border_color_extra_light: #ebebeb; // 假设这个颜色值

::v-deep .el-container {
  .el-header {
    padding: 0;
    min-width: $page_min_width_px;
    height: $header_height_px !important;
    border-bottom: 1px solid $border_color_extra_light;
  }

  .el-aside {
    height: calc(100vh - $header_height_px);
    width: $menu-width !important;
  }

  .el-main {
    padding: 0;
  }

  .page-content {
    margin: 16px 16px 0 16px;
    padding: 0;
    border-radius: 8px 8px 0 0;
    position: relative;
  }

  .el-menu {
    border-right: none;
  }
}
</style>
