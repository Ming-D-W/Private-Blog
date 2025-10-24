// 使用 import.meta.glob 获取所有 .md 文件
const mdFiles = import.meta.glob('@/views/interviewQuestion/**/*.md', {
	eager: false,
});

export const interviewRouteConfig = {
	mdFiles,
	basePath: '/interviewQuestion',
	name: '面试题',
};
