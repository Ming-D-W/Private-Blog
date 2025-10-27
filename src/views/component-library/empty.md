# Empty 空态图

页面无数据时展示的图片和文字。

### 基础用法

标签组的基础用法

```vue demo
<template>
  <empty></empty>
</template>
<script>
  import Empty from '@/components/ui/empty/index.vue';

  export default {
    data() {
      return {}
    },
    components: {Empty},
    computed: {},
    methods: {}
  }
</script>
```

### 文字插槽

用于替换默认文字及样式

```vue demo
<template>
	<empty>
		<template #desc>
			<p class="yx-color-text-placeholder fz-12">暂无数据，敬请期待</p>
		</template>
	</empty>
</template>
<script>
	import Empty from '@/components/ui/empty/index.vue';

	export default {
		data() {
			return {};
		},
		components: { Empty },
		computed: {},
		methods: {},
	};
</script>
```

### 图片插槽

用于替换默认图片

```vue demo
<template>
	<empty>
		<template #image>
			<img src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iI2UwZTBlMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE2IiBmaWxsPSIjOTk5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+6Ieq5a6a5LmJ5Zu+54mHPC90ZXh0Pjwvc3ZnPg==" alt="" style="width: 120px;" />
		</template>
	</empty>
</template>
<script>
	import Empty from '@/components/ui/empty/index.vue';

	export default {
		data() {
			return {};
		},
		components: { Empty },
		computed: {},
		methods: {},
	};
</script>
```

### 按钮

展示按钮

```vue demo
<template>
	<empty :btn-show="true" btn-text="跳转至XXX"></empty>
</template>
<script>
	import Empty from '@/components/ui/empty/index.vue';

	export default {
		data() {
			return {};
		},
		components: { Empty },
		computed: {},
		methods: {},
	};
</script>
```

### Attributes

| 参数      | 说明                                            | 类型           | 可选值     | 默认值 |
| --------- | ----------------------------------------------- | -------------- | ---------- | ------ |
| is-search | 文案内容，true 为暂无筛选数据，false 为暂无数据 | Boolean        | true/false | false  |
| btn-text  | 按钮描述，btnShow 为 true 时有效                | String         | —          | —      |
| btn-show  | 是否展示按钮                                    | Boolean        | true/false | false  |
| size      | 图片宽度                                        | String, Number | —          | 120    |

### Events

| 参数      | 说明                                   | 回调参数 |
| --------- | -------------------------------------- | -------- |
| btn-click | 按钮点击的回调，btnShow 为 true 时有效 | —        |

### Slot

| 参数  | 说明         |
| ----- | ------------ |
| desc  | 替换默认文本 |
| image | 替换默认图片 |
