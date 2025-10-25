import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Markdown from 'unplugin-vue-markdown/vite';
import MarkdownItContainer from 'markdown-it-container';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
	plugins: [
		vue({
			include: [/\.vue$/, /\.md$/], // 支持 .md 文件作为 Vue 组件
		}),
		Markdown({
			headEnabled: true,
			markdownItOptions: {
				html: true,
				linkify: true,
				typographer: true,
			},
			wrapperClasses: 'markdown-body',
			markdownItSetup(md) {
				// 迁移原有的 markdownContainer 配置
				md.use(MarkdownItContainer, 'demo', {
					validate: function (params) {
						return params.trim().match(/^demo\s*(.*)$/);
					},
					render: function (tokens, idx) {
						if (tokens[idx].nesting === 1) {
							let demoInfo = tokens[idx].info.trim().match(/^demo\s+(.*)$/);
							let description = demoInfo && demoInfo.length > 1 ? demoInfo[1] : '';
							let descriptionHTML = description ? md.render(description) : '';
							let content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';

							// HTML 转义函数
							const escapeHtml = (str) => {
								return str
									.replace(/&/g, '&amp;')
									.replace(/</g, '&lt;')
									.replace(/>/g, '&gt;')
									.replace(/"/g, '&quot;')
									.replace(/'/g, '&#039;');
							};

							return `<demo-block>
                <div class="source" slot="source">${escapeHtml(content)}</div>
                ${descriptionHTML}
                <div class="highlight" slot="highlight">`;
						} else {
							return '</div></demo-block>\n';
						}
					},
				});
			},
		}),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@import "@/style/theme-color.scss";`,
			},
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

