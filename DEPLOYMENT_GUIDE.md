# 🚀 EasyFly 游戏部署指南

## 项目信息
- **项目名称**：EasyFly
- **GitHub用户**：hanxhan000
- **仓库地址**：https://github.com/hanxhan000/EasyFly
- **在线地址**：https://hanxhan000.github.io/EasyFly

---

## 📋 部署前准备

### 1. 确保你有GitHub账号
- 用户名：hanxhan000
- 邮箱：114579298@qq.com

### 2. 在GitHub上创建仓库
1. 访问 https://github.com/new
2. 仓库名称：**EasyFly**（必须是这个名称）
3. 设置为 Public（公开）
4. 不要勾选 "Add a README file"
5. 点击 "Create repository"

---

## 🚀 一键部署（推荐）

### 方法1：使用部署脚本

在项目根目录运行：
```bash
.\deploy.bat
```

脚本会自动完成：
1. ✅ 初始化Git仓库
2. ✅ 配置远程仓库
3. ✅ 提交代码
4. ✅ 构建项目
5. ✅ 推送到GitHub
6. ✅ 部署到GitHub Pages

---

## 🔧 手动部署步骤

### 步骤1：初始化Git仓库
```bash
cd d:\app\Qoder-EasyFly
git init
git config user.name "hanxhan000"
git config user.email "114579298@qq.com"
```

### 步骤2：添加远程仓库
```bash
git remote add origin https://github.com/hanxhan000/EasyFly.git
```

### 步骤3：提交代码
```bash
git add .
git commit -m "Initial commit - EasyFly game"
git branch -M main
git push -u origin main
```

### 步骤4：构建并部署
```bash
npm run build
npm run deploy
```

---

## ⚙️ GitHub Pages 设置

部署完成后，需要在GitHub启用Pages：

1. 访问仓库设置页面：
   https://github.com/hanxhan000/EasyFly/settings/pages

2. 在 "Build and deployment" 部分：
   - **Source**: Deploy from a branch
   - **Branch**: gh-pages
   - **Folder**: / (root)

3. 点击 "Save"

4. 等待1-2分钟，刷新页面，会显示：
   ```
   Your site is live at https://hanxhan000.github.io/EasyFly/
   ```

---

## 📱 访问你的游戏

部署成功后，可以通过以下地址访问：

**在线游戏地址**：
```
https://hanxhan000.github.io/EasyFly
```

---

## 🔄 后续更新部署

当你修改游戏代码后，想要更新线上版本：

### 方法1：使用部署脚本
```bash
.\deploy.bat
```

### 方法2：手动更新
```bash
git add .
git commit -m "Update game - [描述你的修改]"
git push origin main
npm run build
npm run deploy
```

---

## 📝 自动部署（GitHub Actions）

项目已配置GitHub Actions，每次推送到main分支会自动部署：

1. 修改代码
2. 提交并推送：
   ```bash
   git add .
   git commit -m "Update: xxx"
   git push origin main
   ```
3. GitHub会自动构建和部署
4. 查看部署状态：https://github.com/hanxhan000/EasyFly/actions

---

## 🐛 常见问题

### Q1: 部署后页面空白或404
**A**: 检查vite.config.js中的base配置是否正确：
```javascript
base: '/EasyFly/'  // 必须与仓库名一致
```

### Q2: 资源加载失败
**A**: 确保所有资源路径使用相对路径，不要使用绝对路径

### Q3: 推送被拒绝
**A**: 如果是首次推送，使用force推送：
```bash
git push -u origin main --force
```

### Q4: GitHub Pages没有自动部署
**A**: 
1. 检查仓库设置中Pages是否启用
2. 确认gh-pages分支已创建
3. 查看Actions标签页的部署日志

---

## 📦 项目配置文件说明

### vite.config.js
```javascript
base: '/EasyFly/'  // GitHub Pages的base路径
```

### package.json
```json
{
  "homepage": "https://hanxhan000.github.io/EasyFly",
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

---

## 🎯 技术栈

- **前端框架**：React 18
- **构建工具**：Vite 5
- **游戏引擎**：Phaser 3.70
- **样式**：TailwindCSS 3
- **状态管理**：Zustand 4
- **部署**：GitHub Pages
- **CI/CD**：GitHub Actions

---

## 📞 支持

如果遇到问题：
1. 查看GitHub Issues
2. 检查部署日志
3. 参考本文档的常见问题部分

---

## 🎉 部署完成检查清单

- [ ] GitHub仓库已创建
- [ ] 代码已推送到main分支
- [ ] GitHub Pages已启用
- [ ] 在线地址可以访问
- [ ] 游戏功能正常
- [ ] 移动端适配正常

---

**Made by hanxhan000** 🎮
