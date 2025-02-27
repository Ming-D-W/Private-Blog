<template>
  <div class="container">
    <div class="header">Header</div>
    <div class="content">
      <div class="sticky">Sticky Element</div>
      <p v-for="i in 50" :key="i">Content {{ i }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "StickyDemo",
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 800px;
}

.header {
  background-color: #f8f9fa;
  padding: 20px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
}

.content {
  background-color: #e9ecef;
}

.sticky {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  background-color: #343a40;
  color: white;
  font-size: 18px;
  z-index: 1000;
}
</style>
