cd ..
python3 -m venv env
call env/scripts/activate
pip install -r requirements.txt
python3 manage.py runserver 0.0.0.0:8002
cmd