// 使用 require.context 获取所有 .md 文件
const mdFiles = require.context(
  "@/views/componentLibrary", // 目录路径
  true, // 是否遍历子目录
  /\.(md|vue)$/ // 匹配文件的正则表达式（支持 .md 和 .vue）
);
export const componentLibrary = {
  mdFiles,
  basePath: "/componentLibrary",
  name: "组件库",
};
