cd ..
python -m venv env
call env/scripts/activate
pip install fastapi[all] black aiosqlite SQLAlchemy
pip install -r requirements.txt
pip freeze > requirements.txt
uvicorn main:app --host=0.0.0.0 --port=8000 --reload --log-level error
cmd
