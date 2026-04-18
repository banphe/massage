@echo off
cd /d "%~dp0.."
echo Downloading Tailwind CSS...
curl -Lo build/tailwindcss.exe https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-windows-x64.exe
echo Downloading daisyUI...
curl -Lo build/daisyui.mjs https://github.com/saadeghi/daisyui/releases/latest/download/daisyui.mjs
echo Done!