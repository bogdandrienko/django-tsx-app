from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from . import models, schemas


async def get_todos(async_session: AsyncSession, skip: int = 0, limit: int = 100):
    result = await async_session.execute(
        select(models.Todo).order_by(models.Todo.id).offset(skip).limit(limit)
    )
    return result.scalars().fetchall()


async def create_todo(async_session: AsyncSession, item: schemas.TodoCreate):
    new_item = models.Todo(**item.dict())
    async_session.add(new_item)
    await async_session.commit()
    return new_item
