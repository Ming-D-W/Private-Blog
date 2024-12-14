<template>
  <el-menu
    class="el-menu-demo right-aligned"
    router
    text-color="#000000"
    active-text-color="#3989fa"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item
      v-for="(item, index) in listMenus"
      :index="item.path"
      :key="index"
    >
      <span slot="title">{{ item.name }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: "",
  props: {
    listMenus: {
      type: Array,
      default: () => [],
    },
  },
  components: {},
  data() {
    return {
      toIndex: 1,
    };
  },
  methods: {
    handleSelect(index) {
      this.$emit("select", index);
    },
  },
};
</script>

<style scoped lang="scss">
.right-aligned {
  background-color: #e0fc58;
  display: flex;
  justify-content: end;
}
</style>
