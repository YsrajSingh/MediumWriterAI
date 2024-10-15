from fastapi import Request, HTTPException, status
from jose import JWTError, jwt
from starlette.middleware.base import BaseHTTPMiddleware
from fastapi.responses import JSONResponse

class JWTMiddleware(BaseHTTPMiddleware):
    def __init__(self, app, secret_key: str, algorithm: str):
        super().__init__(app)
        self.secret_key = secret_key
        self.algorithm = algorithm

    async def dispatch(self, request: Request, call_next):
        if request.method == "OPTIONS":
            return await call_next(request)

        if request.url.path in ["/api/token", "/api/users", "/docs", "/openapi.json", "/"]:
            return await call_next(request)

        token = request.headers.get('Authorization')
        if token is None:
            return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "Authentication Failed, Invalid Token"})

        try:
            token = token.replace('Bearer ', '')
            payload = jwt.decode(token, self.secret_key, algorithms=[self.algorithm])
            request.state.user_id = payload.get('user_id')
        except JWTError:
            return JSONResponse(status_code=status.HTTP_401_UNAUTHORIZED, content={"message": "Invalid Token"})

        return await call_next(request)
