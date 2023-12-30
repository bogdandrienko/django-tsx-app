# TODO download modules ##############################################################################################################################
import datetime
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# TODO custom modules ################################################################################################################################
from src import constants
from src.routes import router as router

#

app = FastAPI(
    title="ChimichangApp",
    description="""
ChimichangApp API helps you do awesome stuff. 🚀

## Items

You can **read items**.

## Users

You will be able to:

* **Create users** (_not implemented_).
* **Read users** (_not implemented_).
""",
    summary="Deadpool's favorite app. Nuff said.",
    version="0.0.1",
    terms_of_service="https://example.com/terms/",
    contact={
        "name": "Deadpoolio the Amazing",
        "url": "https://x-force.example.com/contact/",
        "email": "dp@x-force.example.com",
    },
    license_info={
        "name": "Apache 2.0",
        "url": "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
)
app.mount(
    constants.static_root,
    StaticFiles(directory=constants.static_path),
    name="static",
)
app.mount(
    constants.media_root,
    StaticFiles(directory=constants.media_path),
    name="media",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "localhost:3000",
        "http://127.0.0.1:3000",
        "127.0.0.1:3000",
        "http://127.0.0.1:8000",
        "127.0.0.1:8000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# https://stackoverflow.com/questions/63069190/how-to-capture-arbitrary-paths-at-one-route-in-fastapi
# https://github.com/bripkens/connect-history-api-fallback
app.include_router(router, prefix="", tags=[""])


@app.on_event("startup")
async def startup_event():
    print(f"\n.....server at {datetime.datetime.now()} started.....\n\n\n")


@app.on_event("shutdown")
def shutdown_event():
    print(f"\n\n\n.....server at {datetime.datetime.now()} stopped.....\n")


if __name__ == "__main__":
    pass
