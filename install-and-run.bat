cd /d "%~dp0"
call npm install
if %ERRORLEVEL% EQU 0 (
    echo Dependencies installed successfully!
    call npm run dev
) else (
    echo Failed to install dependencies
    pause
)
