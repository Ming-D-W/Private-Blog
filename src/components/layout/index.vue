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
import { AppMain, HeadBar, SlideBar } from "./components";
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
      const result = [];
      this.$router.options.routes.forEach((route) => {
        if (route.children && route.children.length > 0) {
          route.children.forEach((child) => {
            // 保留子级的 children 并直接添加到结果中
            const transformedRoute = {
              path: child.path,
              name: child.name,
              component: child.component,
              children: child.children || [], // 保留嵌套子路由
            };
            result.push(transformedRoute);
          });
        }
      });
      this.listMenus = result;
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
      console.log(this.sideMenu);
    },
  },
};
</script>

<style scoped lang="scss">
$header_height_px: 64px;
$page_min_width_px: 1366px;
$menu_width_px: 200px;
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
