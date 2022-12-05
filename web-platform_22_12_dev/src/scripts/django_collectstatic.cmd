@echo OFF

cd ..\..\

@REM rmdir /Q /S backend/static

@REM mkdir backend/static

call .\env\Scripts\activate.bat



python source/backend/manage.py collectstatic --noinput

@REM rmdir /Q /S source\frontend\react\production\static

@REM rmdir /Q /S source\frontend\react\test\static

call cmd