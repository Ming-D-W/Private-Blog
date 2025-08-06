# Prettier 统一格式化配置完成总结

## 已完成的配置

### 1. 核心配置文件
- ✅ `.prettierrc` - Prettier 格式化规则配置
- ✅ `.prettierignore` - 忽略格式化的文件和目录
- ✅ `.vscode/settings.json` - VS Code 项目级配置

### 2. 包管理脚本
在 `package.json` 中添加了以下脚本：
- `npm run format` - 格式化 src 目录下的所有支持文件
- `npm run format:check` - 检查格式化状态，不修改文件
- `npm run format:all` - 格式化整个项目的所有支持文件

### 3. 文档指南
- ✅ `docs/vscode-prettier-setup.md` - VS Code 配置指南
- ✅ `docs/webstorm-prettier-setup.md` - WebStorm 配置指南

### 4. 格式化验证
- ✅ 已对项目中的相关文件进行格式化（排除 interviewQuestion 目录）
- ✅ 格式化检查通过，所有文件符合统一标准
- ✅ interviewQuestion 目录已从格式化范围中排除

## 配置详情

### Prettier 规则 (.prettierrc)
```json
{
  "semi": true,                    // 使用分号
  "trailingComma": "es5",         // ES5 兼容的尾随逗号
  "singleQuote": false,           // 使用双引号
  "printWidth": 80,               // 行宽 80 字符
  "tabWidth": 2,                  // 缩进 2 个空格
  "useTabs": false,               // 使用空格而非 Tab
  "bracketSpacing": true,         // 对象括号内有空格
  "arrowParens": "always",        // 箭头函数参数总是使用括号
  "endOfLine": "lf",              // 使用 LF 换行符
  "vueIndentScriptAndStyle": false // Vue 文件中 script 和 style 不缩进
}
```

### 支持的文件类型
- JavaScript (`.js`)
- Vue 单文件组件 (`.vue`)
- CSS/SCSS (`.css`, `.scss`)
- JSON (`.json`)
- Markdown (`.md`)

## 团队使用指南

### 对于 VS Code 用户
1. 安装必要扩展：
   - Prettier - Code formatter
   - ESLint
   - Vetur (Vue 支持)
2. 项目已包含 `.vscode/settings.json`，会自动应用配置
3. 保存时自动格式化已启用

### 对于 WebStorm 用户
1. 参考 `docs/webstorm-prettier-setup.md` 进行配置
2. 启用 Prettier 并指向项目的 `.prettierrc` 文件
3. 启用保存时自动格式化

### 命令行使用
```bash
# 格式化所有文件
npm run format

# 检查格式化状态
npm run format:check

# 格式化整个项目
npm run format:all
```

## 注意事项

1. **版本一致性**: 确保团队成员使用相同版本的 Prettier (当前: 2.4.1)
2. **配置同步**: 不要修改 `.prettierrc` 文件，如需调整请与团队讨论
3. **IDE 配置**: 建议所有成员按照文档配置各自的 IDE
4. **代码审查**: 格式化问题应在本地解决，不应出现在 PR 中
5. **排除目录**: `src/views/interviewQuestion/` 目录已从格式化范围中排除，保持原有格式

## 验证配置是否生效

1. 打开任意 `.vue` 或 `.js` 文件
2. 故意破坏格式（删除分号、改变缩进）
3. 保存文件
4. 检查是否自动格式化为统一标准

如果遇到问题，请参考对应的 IDE 配置指南或运行 `npm run format:check` 检查状态。
