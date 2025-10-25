<template>
	<div id="write">
		<router-view></router-view>
	</div>
</template>

<script>
// Shiki 在构建时完成高亮，无需客户端 JavaScript
export default {
	name: '',
	data() {
		return {};
	},
	computed: {},
};
</script>

<style scoped>
.main {
	box-sizing: border-box;
	background: #ffffff;
	display: flex;
	justify-content: space-between;
	align-items: center;
}
</style>
