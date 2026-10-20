@echo off
cd /d "%~dp0"
echo SEED tier site: http://localhost:8765/index.html
start "" http://localhost:8765/index.html
python -m http.server 8765 || py -m http.server 8765
pause
