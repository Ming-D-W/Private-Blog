// markdownContainer.js
const fs = require('fs');
const markdownRender = require('markdown-it')();

module.exports = {
	validate: function (params) {
		return params.trim().match(/^demo\s*(.*)$/);
	},
	render: function (tokens, idx) {
		if (tokens[idx].nesting === 1) {
			// 1. 获取第一行的内容使用markdown渲染html作为组件的描述
			let demoInfo = tokens[idx].info.trim().match(/^demo\s+(.*)$/);
			let description = demoInfo && demoInfo.length > 1 ? demoInfo[1] : '';
			let descriptionHTML = description ? markdownRender.render(description) : '';
			// 2. 获取代码块内的html和js代码
			let content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';
			console.log(
				!content,
				tokens[idx + 1].type === 'fence',
				tokens[idx + 1].src,
				'tokens[idx].info22222222222222222222222222222222222222222222',
			);
			// if (!content && tokens[idx + 1].type === 'fence' && tokens[idx + 1].src) {
			// 	const filepath = tokens[idx + 1].src;
			// 	content = fs.readFileSync(filepath).toString();
			// }
			// 3. 使用自定义开发组件【DemoBlock】来包裹内容并且渲染成案例和代码示例
			return `<demo-block>
          <div class="source" slot="source">${content}</div>
         ${descriptionHTML}
          <div class="highlight" slot="highlight">`;
		} else {
			return '</div></demo-block>\n';
		}
	},
};
