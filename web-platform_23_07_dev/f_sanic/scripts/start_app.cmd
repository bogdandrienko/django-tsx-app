cd ..
call env/scripts/activate
sanic main:app --host=0.0.0.0 --port=8000 --fast
cmd
