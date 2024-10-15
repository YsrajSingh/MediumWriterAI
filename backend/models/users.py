from sqlalchemy import Column, Integer, String, DateTime
from models import Base
from datetime import datetime, timedelta
from passlib.context import CryptContext
from jose import jwt
from schemas.users import UserResponse, UserCreate
from sqlalchemy.orm import relationship
import os

class Users(Base):
    __tablename__ = "users"
    pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)

    created_at = Column(DateTime, default=lambda: datetime.now())
    updated_at = Column(DateTime, default=lambda: datetime.now(), onupdate=lambda: datetime.now())
    deleted_at = Column(DateTime, nullable=True)

    @classmethod
    def find(cls, session, username: str):
        return session.query(cls).filter_by(username=username, deleted_at=None).first()

    @classmethod
    def create(cls, session, user: UserCreate):
        hashed_password = cls.pwd_context.hash(user.password)
        new_user = cls(
            username=user.username,
            password=hashed_password
        )
        session.add(new_user)
        session.commit()
        session.refresh(new_user)
        return UserResponse(username=new_user.username)

    @staticmethod
    def verify_password(plain_password, hashed_password):
        return Users.pwd_context.verify(plain_password, hashed_password)

    def authenticate_user(self, session, username: str, password: str):
        user = self.find(session, username)
        if not user or not self.verify_password(password, user.password):
            return False
        return user

    @classmethod
    def create_access_token(cls, data: dict, expires_delta: timedelta | None = None):
        to_encode = data.copy()
        expire = datetime.now() + (expires_delta if expires_delta else timedelta(minutes=15))
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, os.getenv('SECRET_KEY'), algorithm=os.getenv('ALGORITHM'))
        return encoded_jwt
