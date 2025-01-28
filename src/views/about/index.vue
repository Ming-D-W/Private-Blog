<template>
  <div>活动列表</div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    // 实现数组去重函数
    arrayUnique(arr) {
      return [...new Set(arr)];
    },
  },
  computed: {},
};
</script>

<style></style>
