@echo off
echo ========================================
echo EasyFly GitHub Pages 部署脚本
echo ========================================
echo.

REM 检查是否已经初始化git
if not exist .git (
    echo [1/6] 初始化Git仓库...
    git init
    git config user.name "hanxhan000"
    git config user.email "114579298@qq.com"
    echo Git仓库初始化完成！
    echo.
) else (
    echo [1/6] Git仓库已存在，跳过初始化
    echo.
)

REM 添加远程仓库（如果还没有）
echo [2/6] 配置远程仓库...
git remote remove origin 2>nul
git remote add origin https://github.com/hanxhan000/EasyFly.git
echo 远程仓库配置完成！
echo.

REM 提交所有更改
echo [3/6] 提交代码到本地仓库...
git add .
git commit -m "Deploy EasyFly game - %date% %time%"
echo 代码提交完成！
echo.

REM 构建项目
echo [4/6] 构建生产版本...
call npm run build
if errorlevel 1 (
    echo 构建失败！请检查错误信息。
    pause
    exit /b 1
)
echo 构建完成！
echo.

REM 推送到GitHub主分支
echo [5/6] 推送代码到GitHub主分支...
git branch -M main
git push -u origin main --force
echo 主分支推送完成！
echo.

REM 部署到GitHub Pages
echo [6/6] 部署到GitHub Pages...
call npm run deploy
if errorlevel 1 (
    echo 部署失败！请检查错误信息。
    pause
    exit /b 1
)
echo.
echo ========================================
echo 部署成功！
echo ========================================
echo.
echo 你的游戏已发布到：
echo https://hanxhan000.github.io/EasyFly
echo.
echo 请访问 GitHub 仓库设置启用 GitHub Pages：
echo https://github.com/hanxhan000/EasyFly/settings/pages
echo 选择 Branch: gh-pages，目录: / (root)
echo.
pause
