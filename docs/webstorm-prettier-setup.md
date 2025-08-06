# WebStorm Prettier 配置指南

## 1. 启用 Prettier 支持

### 步骤一：打开 Prettier 设置
1. 打开 WebStorm
2. 进入 `File` → `Settings` (Windows/Linux) 或 `WebStorm` → `Preferences` (Mac)
3. 导航到 `Languages & Frameworks` → `JavaScript` → `Prettier`

### 步骤二：配置 Prettier
1. 勾选 "On 'Reformat Code' action"
2. 勾选 "On save"
3. 在 "Prettier package" 字段中，选择项目中的 prettier 包路径：
   - 通常是 `{项目根目录}/node_modules/prettier`
4. 在 "Configuration file" 字段中，选择项目根目录的 `.prettierrc` 文件
5. 在 "Files pattern" 中输入：`{**/*,*}.{js,ts,jsx,tsx,vue,scss,css,json,md}`

## 2. 配置文件监听

### 启用保存时自动格式化
1. 在 Prettier 设置页面确保勾选了 "On save"
2. 可以选择性勾选 "On 'Reformat Code' action" 以在手动格式化时使用 Prettier

### 配置文件类型关联
1. 进入 `Editor` → `File Types`
2. 确保以下文件类型正确关联：
   - JavaScript files: `*.js`
   - Vue.js files: `*.vue`
   - CSS files: `*.css`
   - SCSS files: `*.scss`
   - JSON files: `*.json`

## 3. ESLint 集成

### 启用 ESLint
1. 进入 `Languages & Frameworks` → `JavaScript` → `Code Quality Tools` → `ESLint`
2. 选择 "Automatic ESLint configuration"
3. 勾选 "Run eslint --fix on save"

### 配置 ESLint 与 Prettier 协作
确保 ESLint 配置不与 Prettier 冲突：
1. 项目已配置 `eslint-config-prettier` 和 `eslint-plugin-prettier`
2. `.eslintrc.js` 中已包含 `"plugin:prettier/recommended"`

## 4. 快捷键设置

### 设置格式化快捷键
1. 进入 `Keymap` 设置
2. 搜索 "Reformat Code"
3. 可以设置为 `Ctrl+Alt+L` (Windows/Linux) 或 `Cmd+Option+L` (Mac)
4. 搜索 "Fix ESLint Problems"，设置快捷键用于修复 ESLint 问题

## 5. 验证配置

### 测试自动格式化
1. 打开任意 `.vue` 或 `.js` 文件
2. 故意破坏代码格式（删除分号、改变缩进等）
3. 保存文件 (`Ctrl/Cmd + S`)
4. 检查代码是否按照 `.prettierrc` 配置自动格式化

### 手动格式化测试
1. 选中一段代码或整个文件
2. 使用 `Code` → `Reformat Code` 或快捷键
3. 验证格式化结果

## 6. 常见问题解决

### 问题：Prettier 不工作
**解决方案：**
1. 确认 Prettier 包路径正确
2. 检查 `.prettierrc` 文件路径
3. 重启 WebStorm
4. 检查文件是否在 `.prettierignore` 中被忽略

### 问题：格式化结果不一致
**解决方案：**
1. 确保使用项目本地的 Prettier 版本
2. 检查 `.prettierrc` 配置
3. 禁用其他可能冲突的格式化插件

### 问题：ESLint 与 Prettier 冲突
**解决方案：**
1. 确认已安装 `eslint-config-prettier`
2. 检查 `.eslintrc.js` 配置是否正确
3. 运行 `npm run lint` 检查是否有冲突

## 7. 团队协作建议

### 统一配置
- 确保所有团队成员使用相同的 Prettier 和 ESLint 版本
- 定期同步 `.prettierrc` 和 `.eslintrc.js` 配置
- 建议团队成员都启用保存时自动格式化

### 代码审查
- 在代码审查时关注格式化一致性
- 使用 `npm run format:check` 检查格式化状态
- 在 CI/CD 中集成格式化检查
