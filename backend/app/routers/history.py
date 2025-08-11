from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import schemas, crud
from ..database import SessionLocal
from typing import List

router = APIRouter(prefix="/history", tags=["history"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/user/{user_id}", response_model=List[schemas.HistoryOut])
def get_user_history(user_id: int, skip: int = 0, limit: int = 20, db: Session = Depends(get_db)):
    return crud.get_user_history(db, user_id, skip, limit) 