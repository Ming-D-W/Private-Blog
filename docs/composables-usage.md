# Composables 使用指南

## 什么是 Composables？

Composables（组合式函数）是 Vue 3 Composition API 的核心概念之一。它们是可复用的、包含响应式状态逻辑的函数，遵循 `use` 开头的命名约定（类似 React Hooks）。

## 为什么使用 Composables？

### 优势对比

| 特性 | Composables | Mixins (Vue 2) |
|------|-------------|----------------|
| 来源清晰 | ✅ 明确知道数据来自哪个函数 | ❌ 不清楚属性来源 |
| 命名冲突 | ✅ 可以重命名返回值 | ❌ 容易冲突 |
| TypeScript | ✅ 完美支持 | ⚠️ 支持有限 |
| 逻辑复用 | ✅ 灵活组合 | ⚠️ 难以组合多个 |
| 代码组织 | ✅ 按功能组织 | ⚠️ 按选项组织 |

## 项目中的 Composables

### useDialog - 对话框状态管理

位置：`src/composables/useDialog.js`

#### 功能说明

管理对话框的显示/隐藏状态和配置，提供统一的对话框操作接口。

#### API

```javascript
const {
  visible,      // 响应式状态：对话框是否可见
  config,       // 响应式配置：对话框的配置对象
  open,         // 方法：打开对话框
  close,        // 方法：关闭对话框
  toggle,       // 方法：切换对话框状态
  updateConfig  // 方法：更新配置
} = useDialog(initialOptions);
```

#### 使用示例

**基础用法：**

```vue
<script setup>
import { ref, nextTick } from 'vue';
import { useDialog } from '@/composables/useDialog';
import MsgModal from '@/components/modal/MsgModal.vue';

// 创建 dialog 实例
const dialog = useDialog({
  title: '提示',
  content: '这是一个对话框',
  size: 'normal'
});

const dialogRef = ref(null);

// 打开对话框
const openDialog = () => {
  dialog.open();
  nextTick(() => {
    if (dialogRef.value) {
      dialogRef.value.show();
    }
  });
};

// 处理对话框操作
const handleAction = (res) => {
  if (res.key === 'confirm') {
    console.log('确认操作');
  }
  res.done();
};
</script>

<template>
  <el-button @click="openDialog">打开对话框</el-button>
  
  <MsgModal
    ref="dialogRef"
    :options="dialog.config"
    :on-action="handleAction"
    :on-close="dialog.close"
  />
</template>
```

**动态配置：**

```javascript
// 打开时动态修改配置
const openWithCustomConfig = () => {
  dialog.open({
    title: '新标题',
    content: '新内容',
    size: 'large'
  });
  nextTick(() => {
    dialogRef.value?.show();
  });
};
```

**完整配置选项：**

```javascript
const dialog = useDialog({
  title: '提示',                    // 对话框标题
  content: '内容文本',              // 对话框内容
  contentTitle: '重要提示',         // 内容标题（可选）
  width: '600px',                   // 对话框宽度
  size: 'normal',                   // 尺寸：small | normal | large
  btns: [                           // 按钮配置
    {
      type: 'default',
      text: '取消',
      key: 'cancel'
    },
    {
      type: 'primary',
      text: '确认',
      key: 'confirm'
    }
  ]
});
```

## 实际应用场景

### 场景 1: 确认对话框

```javascript
const confirmDialog = useDialog({
  title: '确认删除',
  contentTitle: '警告',
  content: '删除后数据将无法恢复，确定要删除吗？',
  size: 'small'
});

const handleDelete = () => {
  confirmDialog.open();
  nextTick(() => confirmDialogRef.value?.show());
};
```

### 场景 2: 信息展示对话框

```javascript
const infoDialog = useDialog({
  title: '用户协议',
  content: '这里是用户协议的详细内容...',
  size: 'large',
  btns: [
    {
      type: 'primary',
      text: '我知道了',
      key: 'confirm'
    }
  ]
});
```

## 创建自定义 Composables

### 基本结构

```javascript
import { ref, reactive, onMounted, onUnmounted } from 'vue';

export function useCustomFeature(options = {}) {
  // 1. 响应式状态
  const state = ref(initialValue);
  const config = reactive({ ...options });

  // 2. 方法
  const doSomething = () => {
    // 实现逻辑
  };

  // 3. 生命周期钩子
  onMounted(() => {
    // 初始化逻辑
  });

  onUnmounted(() => {
    // 清理逻辑
  });

  // 4. 返回公共 API
  return {
    state,
    config,
    doSomething
  };
}
```

### 最佳实践

1. **命名规范**：使用 `use` 前缀，如 `useDialog`、`useForm`
2. **单一职责**：每个 composable 只负责一个功能
3. **返回对象**：返回对象而不是数组，便于解构和重命名
4. **清理资源**：在 `onUnmounted` 中清理事件监听器、定时器等
5. **文档注释**：添加 JSDoc 注释说明用途和参数

## 参考资源

- [Vue 3 官方文档 - 组合式函数](https://cn.vuejs.org/guide/reusability/composables.html)
- [VueUse - 常用 Composables 集合](https://vueuse.org/)

