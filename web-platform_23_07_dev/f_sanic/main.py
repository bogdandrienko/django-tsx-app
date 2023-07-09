import time
import datetime
from functools import wraps
from sanic import Sanic, Request
from sanic_ext import render
import aiofiles
from sanic import json

app = Sanic("DigitalClone")


def decorator1(is_auth=False):
    def decorator(f: callable):
        @wraps(f)
        async def decorated_function(request: Request, *args, **kwargs):
            time_start_func = time.perf_counter_ns()
            if is_auth:
                raise Exception("Need Authentification!")
            response = await f(request, *args, **kwargs)
            async with aiofiles.open('static/log.txt', mode='a', encoding="utf-8") as file:
                text = f"[{str(datetime.datetime.now())[0:-5:1]}] ({round((time.perf_counter_ns() - time_start_func) / 1000000, 5)} s) {request.url} ({request.method})"
                print(f"\n{text}")
                await file.write(f"{text}\n")
            return response

        return decorated_function

    return decorator

def authorized():
    def decorator(f):
        @wraps(f)
        async def decorated_function(request: Request, *args, **kwargs):
            print(request)
            print(request.headers)
            print(request.args)
            print(request.query_args)
            is_authorized = True
            # is_authorized = await check_request_for_authorization_status(request)
            if is_authorized:
                # the user is authorized.
                # run the handler method and return the response
                response = await f(request, *args, **kwargs)
                return response
            else:
                # the user is not authorized.
                return json(body={"status": "not_authorized"}, status=403)
        return decorated_function
    return decorator


@app.get("/api")  # URL
@decorator1(is_auth=False)
async def f_data(request: Request):  # VIEW

    # todo SYNC
    # with open("data.txt", mode="r", encoding="utf-8") as file:
    #     data = [x.strip() for x in file.readlines()]
    # todo SYNC

    # todo ASYNC
    # async with aiofiles.open('data.txt', mode='r', encoding="utf-8") as file:
    #     data = [x.strip() for x in await file.readlines()]
    # todo ASYNC
    return json(body={"message": "api OK"}, status=200)


@app.get("/")  # URL
async def handler(request: Request):
    names = ["Инна", "Ольа", "Юля"]
    return await render(template_name="index.html", status=200, context={"names": names})


if __name__ == "__main__":
    # sanic main:app --host=0.0.0.0 --port=8000 --fast
    app.run(host="0.0.0.0", port=8000, debug=True, auto_reload=True)
