// 使用 import.meta.glob 获取所有 .md 和 .vue 文件
// .md 文件使用懒加载
const mdFiles = import.meta.glob('@/views/component-library/**/*.md', {
	eager: false,
});

// .vue 文件使用预加载，避免动态导入路径问题
const vueFiles = import.meta.glob('@/views/component-library/**/*.vue', {
	eager: true,
});

// 合并两个对象
const allFiles = { ...mdFiles, ...vueFiles };

export const componentLibrary = {
	mdFiles: allFiles,
	basePath: '/componentLibrary',
	name: '组件库',
};
