import datetime
from fastapi import APIRouter
from fastapi import Depends
from sqlalchemy.orm import Session
from sqlalchemy import select, update, delete, insert, Result

from database import get_async_session
from . import schemas, models

router = APIRouter()


@router.post("/", response_model=dict)
async def create_message(item: schemas.MessageCreate, async_session: Session = Depends(get_async_session)):
    await async_session.execute(insert(models.Message).values(**item.dict()))
    await async_session.commit()
    return {"message": "Created"}


@router.get("/", response_model=list[schemas.Message])
async def read_messages(skip: int = 0, limit: int = 100, async_session: Session = Depends(get_async_session)):
    result: Result = await async_session.execute(select(models.Message).order_by(models.Message.id).offset(skip).limit(limit))
    return result.scalars()


@router.get("/{message_id}", response_model=schemas.Message)
async def read_message(message_id: int, async_session: Session = Depends(get_async_session)):
    result: Result = await async_session.execute(select(models.Message).where(models.Message.id == message_id))
    return result.scalar()


@router.put("/{message_id}", response_model=dict)
async def update_message(message_id: int, async_session: Session = Depends(get_async_session)):
    await async_session.execute(update(models.Message).where(models.Message.id == message_id).values({"created_at": datetime.datetime.now()}))
    await async_session.commit()
    return {"message": "Updated"}


@router.delete("/{message_id}", response_model=dict)
async def delete_message(message_id: int, async_session: Session = Depends(get_async_session)):
    await async_session.execute(delete(models.Message).where(models.Message.id == message_id))
    await async_session.commit()
    return {"message": "Deleted"}
