import datetime
import time
import asyncio
from enum import Enum
from pydantic import BaseModel, Field
from fastapi import FastAPI, Request, status, Depends
from fastapi.exceptions import ValidationError
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from operations.router import router as router_operations

# python pip install fastapi[all] sqlalchemy alembic psycopg2 fastapi-users[sqlalchemy] asyncpg aiosqlite
# uvicorn main.app --reload

# 127.0.0.1:8000/docs
# 127.0.0.1:8000/redoc

# file structures - https://github.com/zhanymkanov/fastapi-best-practices

app = FastAPI(title="Trading app")

app.include_router(router_operations, prefix="/auth", tags=["Auth"])


@app.exception_handler(ValidationError)
async def validation_exception_handler(request: Request, exc: ValidationError):
    """Показ ошибок backend на frontend"""

    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder({"detail": exc.errors()}),
    )


@app.get("/")  # get request
def index1():  # sync view(controller)
    time.sleep(1.0)
    return "index1"


@app.get("/")
async def index2():  # async view(controller)
    await asyncio.sleep(1.0)
    return "index1"


@app.get("/users/{user_id}")  # path parameter
async def get_users(user_id: int):  # user_id: int = 10   # not required
    await asyncio.sleep(1.0)
    return f"user_id: {user_id}"


async def common_parameters(q: str | None = None, skip: int = 0, limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}


@app.get("/trades")
async def get_trades(limit: int = 10, offset: int = 0):  # query parameter
    # async def get_trades(commons: dict = Depends(common_parameters)):  # often query and path parameters
    await asyncio.sleep(1.0)
    data = [x for x in range(1, 1000)]
    return data[offset:][:limit]


@app.post("/users/{user_id}")  # post request
async def change_user_name(user_id: int, new_name: str):
    """Update only username {..."new_name": "new_name"}"""

    await asyncio.sleep(1.0)
    return {"status": 200, "data": "OK"}


class TypeOf(Enum):
    newbie = "newbie"
    expert = "expert"


class Degree(BaseModel):
    id: int
    created_at: datetime.datetime
    type_of: TypeOf


class Trade(BaseModel):
    id: int
    user_id: int
    currency: str = Field(max_length=10)
    side: str
    price: float = Field(ge=0)
    amount: float
    # deg: Degree | None = []


@app.post("/trades", response_model=dict[str, int | list[Trade]])
async def add_trades(trades: list[Trade]):  # Pydantic
    # {..."amount": "ошибочное значение"} == 422, Unprocessable Entity
    # {..."price": -100} == 422, Unprocessable Entity
    # {..."currency": "111111111111111111111111111"} == 422, Unprocessable Entity
    # ...
    await asyncio.sleep(1.0)
    data = [{"example": None}]
    data.extend(trades)
    return {"status": 200, "data": data}


# current_user = fastapi_users.current_user()
# @app.get("/protected-route")
# async def get_trades(user: User = Depends(current_user), limit: int = 10, offset: int = 0):
# """Аутентификация - проверка соответствия логина и пароля"""
# """Авторизация - проверка соответствия прав доступа"""
#     await asyncio.sleep(1.0)
#     data = [x for x in range(1, 1000)]
#     return f"user_id: {user.id}"  # 401
# @app.get("/unprotected-route")
# async def get_trades(user: User = Depends(current_user), limit: int = 10, offset: int = 0):
#     await asyncio.sleep(1.0)
#     data = [x for x in range(1, 1000)]
#     return f"user_id: anonymous"
