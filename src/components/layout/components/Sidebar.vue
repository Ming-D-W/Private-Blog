<template>
  <div class="side-menu-box">
    <div
      class="side-item"
      :class="checkIsActive(item.path)"
      v-for="item in sideMenu"
      :key="item.path"
      @click="menuClickHandle(item.path)"
    >
      {{ item.name }}
    </div>
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
    return {
      activeMenu: "",
    };
  },
  computed: {
    activePath() {
      const matchedPath = [...this.$route.matched];
      const path = matchedPath.map((item) => item.path);
      return path;
    },
  },
  methods: {
    checkIsActive(path) {
      return this.activePath.includes(path) ? "active" : "";
    },
    menuClickHandle(path) {
      if (this.activePath.includes(path)) {
        return;
      }
      this.$router.push(path);
    },
  },
};
</script>

<style scoped lang="scss">
$header-height-px: 64px;
$page-min-width-px: 1366px;
$menu-width-px: 200px;
@function fadeout($color, $amount) {
  $alpha: 1 - ($amount / 100); // 计算目标透明度
  @return rgba(red($color), green($color), blue($color), $alpha);
}

.side-item {
  font-family: PingFangSC-Regular, PingFang SC;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  border-radius: 4px;
  position: relative;
  color: #4e596a;
  background-color: $color-white;
  padding-left: 16px;
  vertical-align: middle;
  cursor: pointer;

  &:nth-child(n + 2) {
    margin-top: 4px;
  }

  &:hover {
    background-color: fadeout($color-primary, 92);
  }

  &.active {
    color: $color-primary;
    background-color: fadeout($color-primary, 92);

    &::before {
      content: "";
      width: 2px;
      height: 12px;
      border-radius: 1px;
      background-color: $color-primary;
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.side-menu-box {
  height: calc(100vh - $header-height);
  background-color: $color-white;
  padding: 8px;
  box-sizing: border-box;
}
</style>
