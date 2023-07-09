cd ../backend
python3 -m venv env
call env/scripts/activate
pip install -r requirements.txt
uvicorn main:app --host=0.0.0.0 --port=8003 --reload --workers 4
cmd
