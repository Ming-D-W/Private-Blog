# Empty 空态图

页面无数据时展示的图片和文字。

### 基础用法

标签组的基础用法

:::demo

```html
<template> </template>
<script>
  export default {
    data() {
      return {};
    },
    components: {},
    computed: {},
    methods: {},
  };
</script>
```

:::

### 文字插槽

用于替换默认文字及样式

:::demo

```html
<template>
  <empty>
    <p slot="desc" class="yx-color-text-placeholder fz-12">
      暂无数据，敬请期待
    </p>
  </empty>
</template>
<script>
  import Empty from "@/components/ui/empty";

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

:::

### 图片插槽

用于替换默认图片

:::demo

```html
<template> </template>
<script>
  export default {
    data() {
      return {};
    },
    components: {},
    computed: {},
    methods: {},
  };
</script>
```

:::

### 按钮

展示按钮

:::demo

```html
<template> </template>
<script>
  export default {
    data() {
      return {};
    },
    components: {},
    computed: {},
    methods: {},
  };
</script>
```

:::

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
