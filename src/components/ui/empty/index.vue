<template>
	<div class="empty">
		<slot name="image">
			<img :style="{ width: imgSize }" :src="image" alt="" />
		</slot>
		<slot name="desc">
			<p class="font-h6-regular yx-color-text-secondary">{{ desc }}</p>
		</slot>
		<div v-if="btnShow" class="mt-10">
			<el-button type="primary" @click="handleClick">{{ btnText }}</el-button>
		</div>
	</div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
	isSearch: {
		type: Boolean,
		default: false,
	},
	btnText: {
		type: String,
		default: '',
	},
	btnShow: {
		type: Boolean,
		default: false,
	},
	size: {
		type: [String, Number],
		default: 120,
	},
});

const emit = defineEmits(['btnClick']);

// 使用占位图片 URL
const image = computed(() => {
	return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2YwZjBmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE0IiBmaWxsPSIjY2NjIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+5peg5pWw5o2uPC90ZXh0Pjwvc3ZnPg==';
});

const desc = computed(() => {
	return props.isSearch ? '暂无筛选数据' : '暂无数据';
});

const imgSize = computed(() => {
	return parseInt(props.size) + 'px';
});

const handleClick = () => {
	emit('btnClick');
};
</script>

<style lang="scss" scoped>
.empty {
	margin-top: 30px;
	margin-bottom: 30px;
	text-align: center;
}

.font-h6-regular {
	font-size: 14px;
	font-weight: 400;
}

.yx-color-text-secondary {
	color: #909399;
}

.mt-10 {
	margin-top: 10px;
}
</style>

