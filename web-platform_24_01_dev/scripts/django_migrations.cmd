cd ..
python -m venv venv
call venv/scripts/activate
pip install -r requirements.txt
pip freeze > requirements.txt



python manage.py makemigrations
python manage.py migrate



cmd
