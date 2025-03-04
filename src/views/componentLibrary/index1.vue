<template>
  <div class="box-container">
    <div class="box" :style="{ borderColor: box1Color }"></div>
    <div class="box" :style="{ borderColor: box2Color }">
      <div class="fixed">1111</div>
    </div>
    <div class="box" :style="{ borderColor: box3Color }">
      <div class="absolute">22222</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      box1Color: this.getRandomColor(),
      box2Color: this.getRandomColor(),
      box3Color: this.getRandomColor(),
    };
  },
  methods: {
    getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    },
  },
};
</script>

<style scoped>
.box-container {
  display: flex;
  justify-content: space-between;
}

.box {
  width: 30%;
  height: 400px;
  border: 2px solid;
}
.fixed {
  position: fixed;
  top: 0;
  left: 0;
}
.absolute {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
