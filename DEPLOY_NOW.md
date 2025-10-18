# 🚀 EasyFly 立即部署指南

## ✅ 已完成的准备工作

- ✅ 项目代码已提交到本地Git仓库
- ✅ 生产版本已构建完成（dist目录）
- ✅ Git用户配置完成（hanxhan000 / 114579298@qq.com）
- ✅ 部署脚本已准备
- ✅ GitHub Actions工作流已配置

---

## 📋 接下来需要你完成的步骤

### 第1步：在GitHub上创建仓库（5分钟）

1. **打开浏览器**，访问：https://github.com/new

2. **填写仓库信息**：
   - Repository name: **EasyFly**（必须是这个名字）
   - Description: EasyFly - 可爱的飞行躲避小游戏
   - 设置为 **Public**（公开）
   - **不要勾选** "Add a README file"
   - **不要勾选** "Add .gitignore"
   - **不要勾选** "Choose a license"

3. **点击 "Create repository"**

---

### 第2步：推送代码到GitHub（2分钟）

创建好仓库后，在PowerShell中执行以下命令：

```powershell
cd d:\app\Qoder-EasyFly
git push -u origin main --force
```

**等待推送完成**（可能需要1-2分钟）

---

### 第3步：部署到GitHub Pages（1分钟）

推送完成后，执行：

```powershell
node ./node_modules/gh-pages/bin/gh-pages.js -d dist
```

**等待部署完成**（约30秒）

---

### 第4步：启用GitHub Pages（2分钟）

1. 访问你的仓库设置页面：
   ```
   https://github.com/hanxhan000/EasyFly/settings/pages
   ```

2. 在 **"Build and deployment"** 部分：
   - Source: **Deploy from a branch**
   - Branch: **gh-pages**
   - Folder: **/ (root)**

3. 点击 **"Save"**

4. 等待1-2分钟，刷新页面

5. 会显示：
   ```
   ✅ Your site is live at https://hanxhan000.github.io/EasyFly/
   ```

---

## 🎮 访问你的游戏

部署成功后，游戏地址：

```
https://hanxhan000.github.io/EasyFly
```

---

## 🔄 后续更新游戏

当你修改了游戏代码，想要更新线上版本：

```powershell
# 1. 进入项目目录
cd d:\app\Qoder-EasyFly

# 2. 提交修改
git add .
git commit -m "Update: 你的修改说明"

# 3. 推送到GitHub
git push origin main

# 4. 重新构建
node ./node_modules/vite/bin/vite.js build

# 5. 部署
node ./node_modules/gh-pages/bin/gh-pages.js -d dist
```

---

## 📝 一键部署脚本

为了方便后续更新，我已经创建了部署脚本。

### 使用方法：

#### 方法1：PowerShell脚本（推荐）
```powershell
cd d:\app\Qoder-EasyFly
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\deploy.ps1
```

#### 方法2：批处理脚本
在文件管理器中双击 `deploy.bat`

---

## ⚡ 快速命令参考

```powershell
# 构建项目
node ./node_modules/vite/bin/vite.js build

# 部署到GitHub Pages
node ./node_modules/gh-pages/bin/gh-pages.js -d dist

# 查看Git状态
git status

# 推送到GitHub
git push origin main
```

---

## 🐛 可能遇到的问题

### Q1: 推送时提示 "Repository not found"
**A**: 确保你已经在GitHub上创建了EasyFly仓库

### Q2: 部署时提示错误
**A**: 先确保已经执行 `git push origin main`

### Q3: 访问页面404
**A**: 
1. 检查仓库Settings → Pages是否已启用
2. 确认Branch选择的是gh-pages
3. 等待2-3分钟，GitHub需要时间构建

### Q4: PowerShell执行策略限制
**A**: 运行以下命令临时允许脚本执行：
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

---

## 📊 当前状态

- ✅ Git仓库已初始化
- ✅ 代码已提交到本地
- ✅ 生产版本已构建（dist目录）
- ✅ 配置文件已完成：
  - vite.config.js（base: '/EasyFly/'）
  - package.json（homepage配置）
  - .github/workflows/deploy.yml（自动部署）
- ⏳ **等待：在GitHub创建仓库**
- ⏳ **等待：推送代码**
- ⏳ **等待：部署Pages**

---

## 🎯 完成检查清单

完成部署后，请检查：

- [ ] GitHub仓库已创建
- [ ] 代码已推送到main分支
- [ ] gh-pages分支已创建
- [ ] GitHub Pages已启用
- [ ] 可以访问 https://hanxhan000.github.io/EasyFly
- [ ] 游戏可以正常玩
- [ ] 移动端可以访问

---

## 📞 需要帮助？

如果遇到问题，可以：
1. 查看 DEPLOYMENT_GUIDE.md 获取详细说明
2. 检查GitHub Actions的部署日志
3. 确认所有步骤都已正确执行

---

**准备好了吗？从第1步开始，创建GitHub仓库吧！** 🚀

Made by hanxhan000 🎮
