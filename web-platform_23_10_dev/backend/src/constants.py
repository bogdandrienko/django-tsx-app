import os
import socket
from . import utils

cache = utils.CacheServer()
DEBUG = True
IS_SERVER = False if str(socket.gethostname()).strip() == "KGPPC-ABN" else True
LOGGING = True
LOGGING_TO_CONSOLE = True
LOGGING_TO_FILE = True
LOGGING_TO_DATABASE = False
LOGGING_RESPONSE = False
jwt_token_lifetime_seconds = 24 * 60 * 60
oracle_db_connection_string = "DISPATCHER/disp@172.30.23.16/PITENEW"

base_folder: str = os.path.join(os.path.dirname(__file__), "..", "..")
templates_path: str = base_folder
static_path: str = os.path.join(base_folder, "backend/react/build/static")
static_root: str = "/static"
media_path: str = os.path.join(base_folder, "backend/media")
media_root: str = "/media"

if __name__ == "__main__":
    pass
