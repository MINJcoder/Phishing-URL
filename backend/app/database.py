from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

# 优先读取环境变量 DATABASE_URL；默认使用本地 SQLite，便于本地快速运行 demo
# 示例：mysql 使用时可设置为
#   DATABASE_URL=mysql+pymysql://user:password@localhost:3306/phishing_db
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./phishing.db")

if DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        DATABASE_URL,
        connect_args={"check_same_thread": False},
    )
else:
    engine = create_engine(DATABASE_URL, pool_pre_ping=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()