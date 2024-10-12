from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from fastapi.openapi.utils import get_openapi
from schemas.index import Quote


app = FastAPI()
load_dotenv()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



api_routers = []


for router in api_routers:
    app.include_router(router, prefix="/api")


@app.get("/")
async def root():
    quote_of_the_time = Quote()
    return {
        "success": True,
        "message": quote_of_the_time.message,
    }