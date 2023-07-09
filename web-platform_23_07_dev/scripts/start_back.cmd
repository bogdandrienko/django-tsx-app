cd ../backend
call env/scripts/activate
uvicorn main:app --host=0.0.0.0 --port=8000 --reload --workers 4
cmd
