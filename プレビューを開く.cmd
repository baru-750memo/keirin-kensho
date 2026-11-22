@echo off
cd /d "%~dp0"
if not exist node_modules call npm ci
if errorlevel 1 exit /b 1
if not exist .next\BUILD_ID call npm run build
if errorlevel 1 exit /b 1
start "" http://127.0.0.1:3110
call npm start
