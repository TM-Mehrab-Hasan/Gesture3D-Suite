@echo off
echo ========================================
echo   Gesture3D Suite - Local Server
echo ========================================
echo.
echo Starting local web server...
echo.
echo Once started, open your browser to:
echo.
echo    http://localhost:8000
echo.
echo Then click on any HTML file to run the app!
echo.
echo Press Ctrl+C to stop the server when done.
echo.
echo ========================================
echo.

python -m http.server 8000

pause
