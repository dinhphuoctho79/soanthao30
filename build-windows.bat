@echo off
REM Build ban Windows (.exe) cho ca 2 ban ND30 - chay file nay tren may Windows 10/11 64-bit
REM Yeu cau: da cai Node.js ban LTS (tu nodejs.org). Khong can cai them gi khac.
REM File cai dat se nam trong cap-xa\dist va tram-y-te-hiep-hung\dist

where node >nul 2>nul
if errorlevel 1 (
  echo CHUA CO Node.js. Hay cai Node.js ban LTS tu nodejs.org roi chay lai file nay.
  pause
  exit /b 1
)

echo === Build ban Cap xa ===
cd /d "%~dp0cap-xa"
call npm install
if errorlevel 1 ( echo LOI npm install ban Cap xa. & pause & exit /b 1 )
call npm run build:win
if errorlevel 1 ( echo LOI build ban Cap xa. & pause & exit /b 1 )

echo === Build ban Tram Y te ===
cd /d "%~dp0tram-y-te-hiep-hung"
call npm install
if errorlevel 1 ( echo LOI npm install ban Tram Y te. & pause & exit /b 1 )
call npm run build:win
if errorlevel 1 ( echo LOI build ban Tram Y te. & pause & exit /b 1 )

echo.
echo XONG. File cai dat:
echo   cap-xa\dist\Soan-thao-ND30-Cap-Xa-Setup.exe
echo   tram-y-te-hiep-hung\dist\Soan-thao-ND30-Tram-Y-Te-Hiep-Hung-Setup.exe
echo Hay kiem tra theo checklist trong HUONG-DAN-BUILD-WINDOWS.md tren may Windows sach.
echo Luu y: ban nay chua ky ma, Windows SmartScreen co the canh bao. Xem HUONG-DAN-BUILD-WINDOWS.md.
pause
