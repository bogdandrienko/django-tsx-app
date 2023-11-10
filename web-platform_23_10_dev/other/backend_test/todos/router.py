from fastapi import APIRouter
from typing import List
from fastapi import Depends
from sqlalchemy.orm import Session
import datetime
import time
import asyncio
from enum import Enum
from pydantic import BaseModel, Field
from fastapi import FastAPI, Request, status, Depends

from . import crud, schemas
from database import get_async_session

router = APIRouter()


@router.get("/api")  # get request
def index1():  # sync view(controller)
    time.sleep(1.0)
    return "index1"


@router.get("/api2")
async def index2():  # async view(controller)
    await asyncio.sleep(1.0)
    return "index1"


@router.get("/users/{user_id}")  # path parameter
async def get_users(user_id: int):  # user_id: int = 10   # not required
    await asyncio.sleep(1.0)
    return f"user_id: {user_id}"


@router.get("/trades")
async def get_trades(limit: int = 10, offset: int = 0):  # query parameter
    await asyncio.sleep(1.0)
    data = [x for x in range(1, 1000)]
    return data[offset:][:limit]


async def common_parameters(q: str | None = None, skip: int = 0, limit: int = 100):
    return {"q": q, "skip": skip, "limit": limit}


@router.get("/trades")
async def get_trades2(commons: dict = Depends(common_parameters)):  # often query and path parameters
    await asyncio.sleep(1.0)
    data = [x for x in range(1, 1000)]
    return data[commons["skip"] :][: commons["limit"]]


@router.post("/users/{user_id}")  # post request
async def change_user_name(user_id: int, new_name: str):
    """Update only username {..."new_name": "new_name"}"""

    await asyncio.sleep(1.0)
    return {"status": 200, "data": "OK"}


class Trade(BaseModel):
    id: int
    user_id: int
    currency: str = Field(max_length=10)
    side: str
    price: float = Field(ge=0)
    amount: float


@router.post("/trades", response_model=dict[str, int | list[Trade]])
async def add_trades(trades: list[Trade]):  # Pydantic
    # {..."amount": "ошибочное значение"} == 422, Unprocessable Entity
    # {..."price": -100} == 422, Unprocessable Entity
    # {..."currency": "111111111111111111111111111"} == 422, Unprocessable Entity
    await asyncio.sleep(1.0)
    data = [{"example": None}]
    data.extend(trades)
    return {"status": 200, "data": data}


@router.get("/", response_model=List[schemas.Todo])
async def read_items(
    skip: int = 0,
    limit: int = 100,
    async_session: Session = Depends(get_async_session),
):
    items = await crud.get_todos(async_session, skip=skip, limit=limit)
    return items


@router.post("/", response_model=schemas.Todo)
async def create_item_for_user(
    item: schemas.TodoCreate,
    async_session: Session = Depends(get_async_session),
):
    return await crud.create_todo(async_session=async_session, item=item)
