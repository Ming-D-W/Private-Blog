import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueMd from 'vite-vue-md';
import path from 'path';
import { fileURLToPath } from 'url';
import prefixSelector from 'postcss-prefix-selector';

// 导入 highlight.js 核心和语言
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import shell from 'highlight.js/lib/languages/shell';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 注册 highlight.js 语言
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('vue', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('bash', shell);
hljs.registerLanguage('sh', shell);

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
				// 自定义 fence 规则以使用 highlight.js
				md.renderer.rules.fence = (tokens, idx, options, env, self) => {
					const token = tokens[idx];
					const code = token.content;
					const lang = token.info.trim();

					let highlighted;
					if (lang && hljs.getLanguage(lang)) {
						try {
							highlighted = hljs.highlight(code, { language: lang }).value;
						} catch (e) {
							console.error('highlight.js error:', e);
							highlighted = code;
						}
					} else {
						highlighted = code;
					}

					// 返回标准的 highlight.js HTML 结构
					return `<pre><code class="hljs language-${lang}">${highlighted}</code></pre>`;
				};
			},
			// 配置 DemoBlock 的代码高亮
			onDemo(componentTag, code) {
				// 注册 DemoBlock 组件
				this.registerComponent('DemoBlock', '@/components/demo-block/index.vue');

				// 使用 highlight.js 高亮 demo 代码
				let highlighted;
				try {
					highlighted = hljs.highlight(code, { language: 'html' }).value;
				} catch (e) {
					console.error('highlight.js error:', e);
					highlighted = code;
				}

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

