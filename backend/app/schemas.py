from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    username: str
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserOut(UserBase):
    id: int
    is_active: bool
    is_admin: bool
    created_at: datetime

    class Config:
        orm_mode = True

class UserLogin(BaseModel):
    username: str
    password: str

class PhishingCheckBase(BaseModel):
    url: str

class PhishingCheckCreate(PhishingCheckBase):
    pass

class PhishingCheckOut(PhishingCheckBase):
    id: int
    result: str
    detail: Optional[str]
    checked_at: datetime
    user_id: Optional[int]

    class Config:
        orm_mode = True

class HistoryBase(BaseModel):
    url: str
    result: str

class HistoryOut(HistoryBase):
    id: int
    checked_at: datetime
    user_id: int

    class Config:
        orm_mode = True 