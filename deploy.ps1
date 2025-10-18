# EasyFly GitHub Pages 部署脚本 (PowerShell版本)
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "EasyFly GitHub Pages 部署脚本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 设置执行策略
Write-Host "[0/6] 设置PowerShell执行策略..." -ForegroundColor Yellow
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process -Force
Write-Host "执行策略设置完成！" -ForegroundColor Green
Write-Host ""

# 检查是否已经初始化git
if (!(Test-Path ".git")) {
    Write-Host "[1/6] 初始化Git仓库..." -ForegroundColor Yellow
    git init
    git config user.name "hanxhan000"
    git config user.email "114579298@qq.com"
    Write-Host "Git仓库初始化完成！" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "[1/6] Git仓库已存在，跳过初始化" -ForegroundColor Green
    Write-Host ""
}

# 添加远程仓库（如果还没有）
Write-Host "[2/6] 配置远程仓库..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin https://github.com/hanxhan000/EasyFly.git
Write-Host "远程仓库配置完成！" -ForegroundColor Green
Write-Host ""

# 提交所有更改
Write-Host "[3/6] 提交代码到本地仓库..." -ForegroundColor Yellow
git add .
$commitMessage = "Deploy EasyFly game - $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
git commit -m $commitMessage
Write-Host "代码提交完成！" -ForegroundColor Green
Write-Host ""

# 构建项目
Write-Host "[4/6] 构建生产版本..." -ForegroundColor Yellow
& npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "构建失败！请检查错误信息。" -ForegroundColor Red
    Read-Host "按任意键退出"
    exit 1
}
Write-Host "构建完成！" -ForegroundColor Green
Write-Host ""

# 推送到GitHub主分支
Write-Host "[5/6] 推送代码到GitHub主分支..." -ForegroundColor Yellow
git branch -M main
git push -u origin main --force
Write-Host "主分支推送完成！" -ForegroundColor Green
Write-Host ""

# 部署到GitHub Pages
Write-Host "[6/6] 部署到GitHub Pages..." -ForegroundColor Yellow
& npm run deploy
if ($LASTEXITCODE -ne 0) {
    Write-Host "部署失败！请检查错误信息。" -ForegroundColor Red
    Read-Host "按任意键退出"
    exit 1
}
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "部署成功！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "你的游戏已发布到：" -ForegroundColor Cyan
Write-Host "https://hanxhan000.github.io/EasyFly" -ForegroundColor Yellow
Write-Host ""
Write-Host "请访问 GitHub 仓库设置启用 GitHub Pages：" -ForegroundColor Cyan
Write-Host "https://github.com/hanxhan000/EasyFly/settings/pages" -ForegroundColor Yellow
Write-Host "选择 Branch: gh-pages，目录: / (root)" -ForegroundColor Cyan
Write-Host ""
Read-Host "按任意键退出"
