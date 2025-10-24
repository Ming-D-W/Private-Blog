// 使用 import.meta.glob 获取所有 .md 和 .vue 文件
const mdFiles = import.meta.glob('@/views/componentLibrary/**/*.{md,vue}', {
	eager: false,
});

export const componentLibrary = {
	mdFiles,
	basePath: '/componentLibrary',
	name: '组件库',
};
