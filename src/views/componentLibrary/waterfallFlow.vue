<template>
  <div>
    <div class="waterfallFlow">
      <div
        v-for="item in items"
        :key="item.id"
        class="item"
        :style="{ height: item.height + 'px' }"
      >
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "waterfallFlowDemo",
  data() {
    return {
      items: [],
    };
  },
  mounted() {
    const arr = [];
    for (let i = 1; i <= 40; i++) {
      const height = Math.floor(Math.random() * (500 - 100 + 1)) + 100;
      arr.push({
        id: i,
        height,
        text: `内容${i}`,
      });
    }
    this.items = arr;
  },
};
</script>

<style scoped>
.waterfallFlow {
  columns: 300px auto;
  column-gap: 20px;
}
.item {
  break-inside: avoid;
  margin-bottom: 20px;
  background: #f0f0f0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
