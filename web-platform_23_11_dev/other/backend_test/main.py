import datetime
from fastapi import FastAPI
from fastapi import Request, status
from fastapi.encoders import jsonable_encoder
from fastapi.exceptions import ResponseValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles
from starlette.responses import HTMLResponse
from starlette.templating import Jinja2Templates

from config import DEBUG
from database import async_engine
from messages.router import router as router_messages
from todos import models
from todos.router import router as router_todos

"""
* Практика:
1.1 Система жалоб на чистом SQL
1.2 Система жалоб на ORM
"""

# best-practices - https://github.com/zhanymkanov/fastapi-best-practices
app = FastAPI(
    title="Todo app",
    description="""
Awesome Example of app. 🚀
""",
    # summary="...",
    # version="0.1",
    # terms_of_service="http://127.0.0.1:8000/docs",
    # contact={
    #     "name": "...",
    #     "url": "http://127.0.0.1:8000/docs",
    #     "email": "...",
    # },
    # license_info={
    #     "name": "...",
    #     "url": "http://127.0.0.1:8000/docs",
    # },
)

app.mount("/static", StaticFiles(directory="frontend/build/static"), name="static")
app.mount("/media", StaticFiles(directory="media"), name="media")
templates = Jinja2Templates(directory="")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    # allow_methods=["*"],
    allow_methods=["GET", "POST", "OPTIONS", "DELETE", "PATCH", "PUT"],
    # allow_headers=["*"],
    allow_headers=[
        "Content-Type",
        "Set-Cookie",
        "Access-Control-Allow-Headers",
        "Access-Control-Allow-Origin",
        "Authorization",
    ],
)


@app.exception_handler(ResponseValidationError)
async def validation_exception_handler(request: Request, exc: ResponseValidationError):
    print("Error: ", exc.errors())
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content=jsonable_encoder({"error detail": exc.errors()}),
    )


@app.on_event("startup")
async def startup_event():
    async with async_engine.begin() as conn:
        # await conn.run_sync(models.Base.metadata.drop_all)
        await conn.run_sync(models.Base.metadata.create_all)
    if DEBUG:
        print(f"\n.....server STARTED at {datetime.datetime.now()}.....\n\n\n")


@app.on_event("shutdown")
async def shutdown_event():
    if DEBUG:
        print(f"\n\n\n.....server STOPPED at {datetime.datetime.now()}.....\n")


@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    try:
        return templates.TemplateResponse("frontend/build/index.html", {"request": request})
    except Exception as error:
        return templates.TemplateResponse(
            "templates/error.html",
            {"request": request, "error": str(error.__str__)},
        )


# app.include_router(
#     router_todos,
#     prefix="/todos",
#     tags=["Todos"],
# )

app.include_router(
    router_messages,
    prefix="/messages",
    tags=["Messages"],
)
