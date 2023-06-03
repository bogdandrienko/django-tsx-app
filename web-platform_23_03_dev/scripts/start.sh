cd ..
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
python3 manage.py runserver 0.0.0.0:8006
sh