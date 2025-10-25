/**
 * highlight.js 运行时配置
 * 按需加载语言包，优化构建体积
 */
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import xml from 'highlight.js/lib/languages/xml';
import css from 'highlight.js/lib/languages/css';
import shell from 'highlight.js/lib/languages/shell';

// 注册常用语言
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);
hljs.registerLanguage('xml', xml);
hljs.registerLanguage('html', xml);
hljs.registerLanguage('vue', xml);
hljs.registerLanguage('css', css);
hljs.registerLanguage('shell', shell);
hljs.registerLanguage('bash', shell);
hljs.registerLanguage('sh', shell);

/**
 * 高亮代码
 * @param {string} code - 代码内容
 * @param {string} language - 语言类型
 * @returns {string} 高亮后的 HTML
 */
export function highlightCode(code, language) {
	if (language && hljs.getLanguage(language)) {
		try {
			return hljs.highlight(code, { language }).value;
		} catch (error) {
			console.error('highlight.js error:', error);
			return code;
		}
	}
	return code;
}

export default hljs;

