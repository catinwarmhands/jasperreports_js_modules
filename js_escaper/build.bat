@echo off

echo Updating pip
python -m pip install --upgrade pip

echo Updating pyinstaller
pip install pyinstaller --upgrade

echo Updating mypy
pip install mypy --upgrade

echo Running mypy
mypy js_escaper.py

if %errorlevel% neq 0 (
    echo There were errors in type checking!
    echo Cleanning temp files
    call cleanup
    pause
    exit %errorlevel%
)

if exist js_escaper.exe (
    echo Removing js_escaper.exe
    del /Q js_escaper.exe
)

echo Running pyinstaller
pyinstaller ^
--clean ^
--onefile ^
--add-data "js_escaper.py;." ^
--exclude-module matplotlib ^
js_escaper.py

echo Moving executable
move dist\js_escaper.exe .


echo Cleanning temp files
call cleanup

pause