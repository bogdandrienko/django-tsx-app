@echo OFF

cd ..\..\

call .\env\Scripts\activate.bat



python source/backend/manage.py makemigrations

python source/backend/manage.py migrate



call cmd