@echo off

if exist .mypy_cache\ (
    echo Removing .mypy_cache
    rmdir /S /Q .mypy_cache\
)

if exist __pycache__\ (
    echo Removing __pycache__\
    rmdir /S /Q __pycache__\
)

if exist build\ (
    echo Removing build\
    rmdir /S /Q build\
)
if exist dist\ (
    echo Removing dist\
    rmdir /S /Q dist\
)

echo Removing *.spec
del /q *.spec
