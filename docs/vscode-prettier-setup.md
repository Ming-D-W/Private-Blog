# VS Code Prettier 配置指南

## 1. 安装必要的扩展

在 VS Code 中安装以下扩展：

- **Prettier - Code formatter** (esbenp.prettier-vscode)
- **ESLint** (dbaeumer.vscode-eslint)
- **Vetur** (octref.vetur) - 用于 Vue 文件支持

## 2. 配置 VS Code 设置

### 方法一：通过设置界面配置

1. 打开 VS Code 设置 (`Ctrl/Cmd + ,`)
2. 搜索 "format on save"，勾选 "Editor: Format On Save"
3. 搜索 "default formatter"，选择 "Prettier - Code formatter"

### 方法二：通过 settings.json 配置

在项目根目录创建 `.vscode/settings.json` 文件（如果不存在），添加以下配置：

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "prettier.requireConfig": true,
  "prettier.useEditorConfig": false
}
```

## 3. 验证配置

1. 打开任意 `.vue` 或 `.js` 文件
2. 故意破坏代码格式（如删除分号、改变缩进）
3. 保存文件 (`Ctrl/Cmd + S`)
4. 检查代码是否自动格式化

## 4. 手动格式化

- **格式化当前文件**: `Shift + Alt + F` (Windows/Linux) 或 `Shift + Option + F` (Mac)
- **格式化选中代码**: 选中代码后按上述快捷键

## 5. 常见问题

### 问题：保存时没有自动格式化
**解决方案：**
- 确保已安装 Prettier 扩展
- 检查 "Editor: Format On Save" 是否已启用
- 确保项目根目录存在 `.prettierrc` 文件

### 问题：格式化结果与预期不符
**解决方案：**
- 检查 `.prettierrc` 配置是否正确
- 确保没有其他格式化工具冲突
- 重启 VS Code

## 6. 团队协作建议

- 建议团队成员都使用相同的 VS Code 配置
- 可以将 `.vscode/settings.json` 提交到版本控制
- 定期检查团队成员的格式化配置是否一致
