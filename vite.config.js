import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueMd from 'vite-vue-md';
import path from 'path';
import { fileURLToPath } from 'url';
import prefixSelector from 'postcss-prefix-selector';
import hljs, { highlightCode } from './src/utils/highlight.js';
import anchor from 'markdown-it-anchor';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [
		vue({
			include: [/\.vue$/, /\.md$/], // 支持 .md 文件作为 Vue 组件
		}),
		vueMd({
			markdownItOptions: {
				html: true,
				linkify: true,
				typographer: true,
			},
			wrapperClass: 'markdown-body', // 使用 GitHub 风格的 markdown-body 类名
			// 配置 highlight.js for markdown-it
			markdownItSetup(md) {
				// 配置 markdown-it-anchor 插件，为标题自动生成 id
				md.use(anchor, {
					permalink: false, // 不生成永久链接图标
					slugify: (s) =>
						String(s)
							.trim()
							.toLowerCase()
							.replace(/\s+/g, '-') // 空格替换为连字符
							.replace(/[^\w\u4e00-\u9fa5-]/g, '') // 保留字母、数字、中文和连字符
							.replace(/--+/g, '-') // 多个连字符替换为单个
							.replace(/^-+|-+$/g, ''), // 移除首尾连字符
				});

				// 自定义 fence 规则以使用 highlight.js
				md.renderer.rules.fence = (tokens, idx, options, env, self) => {
					const token = tokens[idx];
					const code = token.content;
					const lang = token.info.trim();

					// 使用工具函数进行代码高亮
					const highlighted = highlightCode(code, lang);

					// 返回标准的 highlight.js HTML 结构
					return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
				};
			},
			// 配置 DemoBlock 的代码高亮
			onDemo(componentTag, code) {
				// 注册 DemoBlock 组件
				this.registerComponent('DemoBlock', '@/components/demo-block/index.vue');

				// 使用工具函数高亮 demo 代码
				const highlighted = highlightCode(code, 'html');

				// 返回标准的 highlight.js HTML 结构
				const highlightedHtml = `<pre><code class="hljs language-html">${highlighted}</code></pre>`;

				return `
					<DemoBlock>
						<template #source>
							${componentTag}
						</template>
						<template #highlight>
							${highlightedHtml}
						</template>
					</DemoBlock>
				`;
			},
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
		extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "@/style/theme-color.scss";`,
			},
		},
		postcss: {
			plugins: [
				prefixSelector({
					prefix: '.markdown-body',
					transform(prefix, selector, prefixedSelector) {
						// 排除 :root，保留 CSS 变量定义
						if (selector.includes(':root')) {
							return selector;
						}

						// 排除 @keyframes
						if (selector.includes('@keyframes')) {
							return selector;
						}

						// 已经包含 .markdown-body 的选择器，避免重复添加
						if (selector.includes('.markdown-body')) {
							return selector;
						}

						// html 选择器改为应用到 .markdown-body 本身
						if (selector.trim() === 'html') {
							return '.markdown-body';
						}

						// body 选择器改为应用到 .markdown-body 本身
						if (selector.trim() === 'body') {
							return '.markdown-body';
						}

						// body > * 改为 .markdown-body > *
						if (selector.includes('body >')) {
							return selector.replace(/body\s*>/g, '.markdown-body >');
						}

						// body 开头的选择器改为 .markdown-body
						if (selector.startsWith('body ')) {
							return selector.replace(/^body\s+/, '.markdown-body ');
						}

						// 其他选择器添加前缀
						return prefixedSelector;
					},
					// 只处理 Markdown 相关的样式文件
					includeFiles: [/markdown-vue-theme\.scss$/, /highlight-typora-onedark\.css$/],
				}),
			],
		},
	},
	server: {
		port: 8080, // 保持与原项目相同的端口
		open: true,
	},
	build: {
		outDir: 'dist',
		assetsDir: 'assets',
		sourcemap: false,
	},
});

