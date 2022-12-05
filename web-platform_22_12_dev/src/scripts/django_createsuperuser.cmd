@echo OFF

cd ..\..\

call .\env\Scripts\activate.bat



python source/backend/manage.py createsuperuser



call cmd