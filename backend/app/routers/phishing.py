from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from .. import schemas, crud
from ..database import SessionLocal
from typing import Optional

router = APIRouter(prefix="/phishing", tags=["phishing"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/check", response_model=schemas.PhishingCheckOut)
def check_url(check: schemas.PhishingCheckCreate, user_id: Optional[int] = None, db: Session = Depends(get_db)):
    # 这里应调用实际的检测算法/服务，暂用 mock 结果
    result = "safe"  # safe/suspicious/phishing
    detail = "检测算法结果详情（此处为示例）"
    return crud.create_phishing_check(db, check, result, detail, user_id) 