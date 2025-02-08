// 使用 require.context 获取所有 .md 文件
const mdFiles = require.context(
  "@/views/interviewQuestion", // 目录路径
  true, // 是否遍历子目录
  /\.md$/ // 匹配文件的正则表达式
);
export const interviewRouteConfig = {
  mdFiles,
  basePath: "/interviewQuestion",
  name: "面试题",
};
