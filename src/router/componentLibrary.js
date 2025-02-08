// 使用 require.context 获取所有 .md 文件
const mdFiles = require.context(
  "@/views/componentLibrary", // 目录路径
  true, // 是否遍历子目录
  /\.md$/ // 匹配文件的正则表达式
);
export const componentLibrary = {
  mdFiles,
  basePath: "/componentLibrary",
  name: "组件库",
};
