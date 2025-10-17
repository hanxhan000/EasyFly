@echo off
echo ========================================
echo   清空EasyFly游戏排行榜
echo ========================================
echo.
echo 此脚本将清空排行榜数据（localStorage）
echo.
pause

echo.
echo 正在清空排行榜...

REM 启动浏览器并执行清空脚本
start chrome --new-window http://localhost:5175/?clear-leaderboard

echo.
echo ✅ 请在打开的浏览器窗口中：
echo    1. 按F12打开控制台
echo    2. 输入: window.clearLeaderboard()
echo    3. 确认清空操作
echo.
pause
