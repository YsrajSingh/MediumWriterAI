from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from models import get_db
from models.users import Users
from schemas.users import UserResponse, UserCreate, Token, TokenData
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta
from jose import JWTError, jwt
import os

router = APIRouter(prefix="", tags=["Users"])
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@router.post("/users", response_model=UserResponse)
async def register_users(user: UserCreate, session: Session = Depends(get_db)):
    db_user = Users.find(session=session, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    return Users.create(session, user)

@router.post("/token", response_model=Token)
async def login_for_access_token(formdata: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_db)):
    user = Users().authenticate_user(session, formdata.username, formdata.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=int(os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES', 60)))
    access_token = Users.create_access_token(
        data={"sub": user.username, "user_id": user.id}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=TokenData)
async def fetch_me(token: str = Depends(oauth2_scheme), session: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, os.getenv('SECRET_KEY'), algorithms=[os.getenv('ALGORITHM')])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = TokenData(username=username)
    except JWTError:
        raise credentials_exception
    
    user = Users.find(session, username=token_data.username)
    if user is None:
        raise credentials_exception
    
    return user
