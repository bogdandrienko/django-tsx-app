from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import declarative_base, sessionmaker
from config import DB_SQLITE_PATH

SQLALCHEMY_DATABASE_URL = f"sqlite+aiosqlite:///{DB_SQLITE_PATH}"
async_engine = create_async_engine(SQLALCHEMY_DATABASE_URL, echo=False)
SessionLocal = sessionmaker(async_engine, expire_on_commit=False, class_=AsyncSession)
Base = declarative_base()


async def get_async_session():
    async_session = SessionLocal()
    try:
        yield async_session
    finally:
        await async_session.close()
