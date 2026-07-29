@echo off
cd /d "%~dp0"
start "Lin's space" http://127.0.0.1:5174/
node node_modules\vite\bin\vite.js --host 127.0.0.1 --port 5174 --strictPort
