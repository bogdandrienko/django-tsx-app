cd ../backend
python311 -m venv env
call env/scripts/activate
pip install -r requirements.txt
uvicorn main:app --host=0.0.0.0 --port=8003 --log-level error
cmd
