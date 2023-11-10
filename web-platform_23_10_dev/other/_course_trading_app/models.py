import datetime
from sqlalchemy import (
    MetaData,
    Table,
    Column,
    Integer,
    String,
    TIMESTAMP,
    ForeignKey,
    JSON,
)
from dotenv import load_dotenv
import os

# alembic init migrations
# alembic revision --autogenerate -m "Database creation"
# alembic upgrade e4cef3db72d1
# alembic upgrade head

# host:post/password - ONLY in .env files
# sqlalchemy.url = posgtresql://%(DB_USER)s:%(DB_PASSWORD)s@%(DB_HOST)s%(DB_PORT)s%(DB_NAME)s

load_dotenv(".env")
DB_HOST = os.environ.get("DB_HOST")
DB_PORT = os.environ.get("DB_PORT")
DB_NAME = os.environ.get("DB_NAME")
DB_USER = os.environ.get("DB_USER")
DB_PASSWORD = os.environ.get("DB_PASSWORD")

# section = config.c

metadata = MetaData()

roles = Table(
    "roles",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
    Column("permissions", JSON, nullable=True),
)

users = Table(
    "users",
    metadata,
    Column("id", Integer, primary_key=True),
    Column("email", String, nullable=False),
    Column("username", String, nullable=False),
    Column("password", String, nullable=False),  # hashed
    Column(
        "registered_at", TIMESTAMP, default=datetime.datetime.utcnow()
    ),  # correct for timezone
    Column("role_id", Integer, ForeignKey("roles.id")),
)

pass
