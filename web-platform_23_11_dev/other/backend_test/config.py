import os

from dotenv import load_dotenv

load_dotenv()

# DB_HOST = os.environ.get("DB_HOST", "127.0.0.1")
# DEBUG = os.environ.get("DEBUG", True)
DEBUG = True
DB_SQLITE_PATH = os.environ.get("db.db", "db.db")
