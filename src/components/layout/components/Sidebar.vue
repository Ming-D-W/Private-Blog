<template>
  <div class="inner-box">
    <el-menu
      class="el-menu-demo right-aligned"
      router
      text-color="#000000"
      active-text-color="#3989fa"
      mode="vertical"
      @select="handleSelect"
    >
      <el-menu-item
        v-for="(item, index) in sideMenu"
        :index="item.path"
        :key="index"
      >
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    sideMenu: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {
    handleSelect(index) {
      this.$emit("select", index);
    },
  },
};
</script>

<style scoped lang="scss">
$header-height-px: 64px;
$page-min-width-px: 1366px;
$menu-width-px: 200px;

.inner-box {
  width: 100%;
  min-width: $page-min-width-px;
  margin: 0 auto;
  overflow: hidden;
}
</style>
