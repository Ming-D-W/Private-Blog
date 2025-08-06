<template>
  <div class="f">
    <div class="c"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [1, 2, 3],
    };
  },
  methods: {},
};
</script>

<style scoped>
.f {
  height: 400px;
  width: 400px;
  background-color: #00a982;
  margin-top: 20px;
  /*border: 2px solid;*/
}
.c {
  height: 200px;
  width: 200px;
  /*border: 2px solid;*/
  margin-top: 10px;
  background-color: #000000;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    background-color: #cdfa67;
  }
}
</style>
