from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, phishing, history, admin
from .database import Base, engine
from . import models

app = FastAPI()

# 允许本地前端访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"]
    ,allow_headers=["*"]
)

# 启动时自动创建表（SQLite demo 友好；生产环境建议使用迁移工具）
Base.metadata.create_all(bind=engine)

app.include_router(auth.router)
app.include_router(phishing.router)
app.include_router(history.router)
app.include_router(admin.router)

@app.get("/")
def read_root():
    return {"message": "Phishing URL Detection Backend is running."} 