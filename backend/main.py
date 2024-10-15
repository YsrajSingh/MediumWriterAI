from fastapi import FastAPI, APIRouter
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from middleware import JWTMiddleware
from endpoints import users
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

app.add_middleware(
    JWTMiddleware,
    secret_key=os.getenv('SECRET_KEY'),
    algorithm=os.getenv('ALGORITHM')
)

api_routers = [
    users.router,
]

for router in api_routers:
    app.include_router(router, prefix="/api")


@app.get("/")
async def root():
    quote_of_the_time = Quote()
    return {
        "success": True,
        "message": quote_of_the_time.message,
    }


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    
    openapi_schema = get_openapi(
        title="Gen Y Projects",
        version="0.0.1",
        routes=app.routes
    )

    # Define the security scheme
    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT",
        }
    }

    # Add security requirements to each route
    for route in openapi_schema["paths"].values():
            for method in route.values():
                method["security"] = [{"BearerAuth": []}]

    
    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi