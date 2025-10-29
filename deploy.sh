#!/usr/bin/env bash

# 确保脚本在出错时停止
set -e

echo "开始构建..."
npm run build

echo "进入构建目录..."
cd dist

# 如果是第一次部署，初始化 git
if [ ! -d .git ]; then
  git init
  git checkout -b gh-pages
fi

echo "添加所有文件..."
git add -A

echo "提交更改..."
git commit -m "deploy: $(date '+%Y-%m-%d %H:%M:%S')"

echo "推送到 GitHub Pages..."
# 请将下面的 URL 替换为您的仓库地址
git push -f git@github.com:ming-d-w/Private-Blog.git gh-pages

echo "部署完成!"
echo "请访问: https://ming-d-w.github.io/Private-Blog/"

cd -

