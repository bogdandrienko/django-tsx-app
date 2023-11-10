from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

router = APIRouter(prefix="/auth", tags=["Operation"])


@router.get("/")
async def read_items(user_id):
    user_id = "123; DROP TABLE POSTGRES;"
    query = f"SELECT * FROM items WHERE user_id = {user_id}"  # TODO !SQL INJECTION
    return {"message": "Hello World"}


@router.get("/")
async def get_specific_operations(
    operation_type: str, session: AsyncSession = Depends(get_async_session)
):
    query = select(operation).where(operation.c.type == operation_type)
    result = await session.execute(query)
    return result.all()


@router.post("/")
async def add_specific_operations(
    new_operation: OperationCreate, session: AsyncSession = Depends(get_async_session)
):
    query = select(operation).where(operation.c.type == operation_type)
    result = await session.execute(query)
    return {"status": "success"}
