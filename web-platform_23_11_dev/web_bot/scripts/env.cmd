cd ..
python -m venv env
call env/scripts/activate
pip install aiogram
pip install -r requirements.txt
pip freeze > requirements.txt



cmd