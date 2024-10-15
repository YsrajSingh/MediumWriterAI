from fastapi import Request, HTTPException
from starlette.middleware.base import BaseHTTPMiddleware
import os
from clerk import Client


clerk_client = Client(api_key=os.getenv("CLERK_SECRET_KEY"))

# Middleware to verify Clerk JWT and extract the user ID
class ClerkAuthMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        authorization_header = request.headers.get("Authorization")

        if not authorization_header or not authorization_header.startswith("Bearer "):
            raise HTTPException(status_code=401, detail="Authorization header missing or invalid")

        token = authorization_header.split(" ")[1]

        try:
            # Verify token using Clerk's SDK
            session = clerk_client.verify_token(token)
            # Attach the user ID to the request for further processing
            request.state.user_id = session['sub']  # 'sub' contains the Clerk user ID
        except Exception as e:
            raise HTTPException(status_code=401, detail="Invalid token")

        response = await call_next(request)
        return response