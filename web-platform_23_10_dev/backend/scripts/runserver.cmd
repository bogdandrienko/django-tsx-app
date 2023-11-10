cd ..
call env/scripts/activate
uvicorn main:app --host=0.0.0.0 --port=8000 --reload --log-level error
cmd
