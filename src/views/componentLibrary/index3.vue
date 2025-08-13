<template>
	<div class="flex-row-align-center">
		<div class="box-container">
			<div v-for="item in list" :key="item" class="box"></div>
		</div>
		<div class="f">
			<div class="c"></div>
		</div>
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
.flex-row-align-center {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.box-container {
	display: flex;
	flex-direction: column;
}

.box {
	height: 400px;
	width: 400px;
	border: 2px solid;
	margin: 16px 16px 24px;
}
.f {
	height: 400px;
	width: 400px;
	background-color: #00a982;
	margin-top: 20px;
	//border: 2px solid;
}
.c {
	height: 200px;
	width: 200px;
	border: 2px solid;
	margin-top: 10px;
	background-color: #000000;
}
</style>
