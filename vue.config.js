const { defineConfig } = require("@vue/cli-service");
const markdownContainer = require("./src/plugins/markdownContainer.js");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module
      .rule("md")
      .test(/\.md$/)
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("vue-markdown-loader")
      .loader("vue-markdown-loader/lib/markdown-compiler")
      .options({
        raw: true,
        preventExtract: true,
        use: [
          [
            require("markdown-it-container"),
            "demo",
            markdownContainer, // 引入外部配置文件中的配置项
          ],
        ],
      });
  },
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/style/theme-color.scss";`,
      },
    },
  },
});
