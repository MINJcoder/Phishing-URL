from sqlalchemy.orm import Session
from . import models, schemas
from passlib.context import CryptContext
from typing import Optional

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

# 用户相关

def get_user_by_username(db: Session, username: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.username == username).first()

def get_user_by_email(db: Session, email: str) -> Optional[models.User]:
    return db.query(models.User).filter(models.User.email == email).first()

def create_user(db: Session, user: schemas.UserCreate) -> models.User:
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        username=user.username,
        email=user.email,
        hashed_password=hashed_password
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

# 检测相关

def create_phishing_check(db: Session, check: schemas.PhishingCheckCreate, result: str, detail: Optional[str], user_id: Optional[int] = None) -> models.PhishingCheck:
    db_check = models.PhishingCheck(
        url=check.url,
        result=result,
        detail=detail,
        user_id=user_id
    )
    db.add(db_check)
    db.commit()
    db.refresh(db_check)
    return db_check

# 历史相关

def create_history(db: Session, user_id: int, url: str, result: str) -> models.History:
    db_history = models.History(
        user_id=user_id,
        url=url,
        result=result
    )
    db.add(db_history)
    db.commit()
    db.refresh(db_history)
    return db_history

def get_user_history(db: Session, user_id: int, skip: int = 0, limit: int = 20):
    return db.query(models.History).filter(models.History.user_id == user_id).order_by(models.History.checked_at.desc()).offset(skip).limit(limit).all() 