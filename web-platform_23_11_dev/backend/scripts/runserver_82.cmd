cd ..
call env/scripts/activate
uvicorn main:app --host=0.0.0.0 --port=82 --reload --log-level error
cmd