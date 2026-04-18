@echo off
cd /d "%~dp0.."
.\build\tailwindcss.exe -i .\build\input.css -o .\output.css --watch
