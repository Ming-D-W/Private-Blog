import { ref, reactive } from 'vue';

/**
 * Dialog 组合式函数
 * 用于管理对话框的显示/隐藏状态和配置
 * 
 * @param {Object} initialOptions - 初始配置选项
 * @returns {Object} - 返回 dialog 相关的状态和方法
 * 
 * @example
 * // 在组件中使用
 * import { useDialog } from '@/composables/useDialog';
 * 
 * const dialog = useDialog({
 *   title: '提示',
 *   content: '这是一个对话框'
 * });
 * 
 * // 打开对话框
 * dialog.open();
 * 
 * // 关闭对话框
 * dialog.close();
 */
export function useDialog(initialOptions = {}) {
  // 对话框显示状态
  const visible = ref(false);

  // 对话框配置
  const config = reactive({
    title: initialOptions.title || '提示',
    content: initialOptions.content || '',
    contentTitle: initialOptions.contentTitle || '',
    width: initialOptions.width || '600px',
    size: initialOptions.size || 'normal',
    btns: initialOptions.btns || [
      {
        type: 'default',
        text: '取消',
        key: 'cancel',
      },
      {
        type: 'primary',
        text: '确认',
        key: 'confirm',
      },
    ],
  });

  /**
   * 打开对话框
   * @param {Object} newConfig - 可选的新配置，会合并到当前配置中
   */
  const open = (newConfig = {}) => {
    // 合并新配置
    Object.assign(config, newConfig);
    visible.value = true;
  };

  /**
   * 关闭对话框
   */
  const close = () => {
    visible.value = false;
  };

  /**
   * 切换对话框显示状态
   */
  const toggle = () => {
    visible.value = !visible.value;
  };

  /**
   * 更新配置
   * @param {Object} newConfig - 新的配置对象
   */
  const updateConfig = (newConfig) => {
    Object.assign(config, newConfig);
  };

  return {
    visible,
    config,
    open,
    close,
    toggle,
    updateConfig,
  };
}

