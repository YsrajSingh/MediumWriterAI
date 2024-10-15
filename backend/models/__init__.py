from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import DeclarativeMeta, declarative_base
from sqlalchemy import MetaData
import os
import importlib
import pkgutil


POSTGRES_HOST = os.getenv('DB_HOST', 'postgres')  # Provide a default value in case the env var is not set
POSTGRES_USER = os.getenv('DB_USER', 'user')
POSTGRES_PASSWORD = os.getenv('DB_PASSWORD', 'password')
POSTGRES_DB = os.getenv('DB_NAME', 'db')
PGADMIN_DEFAULT_PORT = os.getenv('DB_PORT', '5432')  # Default port for PostgreSQL

SQLALCHEMY_DATABASE_URL = (
    f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{PGADMIN_DEFAULT_PORT}/{POSTGRES_DB}"
)

engine = create_engine(SQLALCHEMY_DATABASE_URL)
Session = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = Session()
    try:
        yield db
    finally:
        db.close()
  
Base: DeclarativeMeta = declarative_base(metadata=MetaData())

# Base.metadata.create_all(engine)

# Dynamically import all modules in the 'models' package
def import_models():
    package = __import__(__name__, fromlist=[""])
    path = package.__path__
    for _, module_name, _ in pkgutil.iter_modules(path):
        importlib.import_module(f"{__name__}.{module_name}")

import_models()
