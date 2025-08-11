from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey, Text
from sqlalchemy.orm import relationship
from .database import Base
import datetime

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(120), unique=True, index=True, nullable=False)
    hashed_password = Column(String(128), nullable=False)
    is_active = Column(Boolean, default=True)
    is_admin = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    histories = relationship("History", back_populates="user")

class PhishingCheck(Base):
    __tablename__ = "phishing_checks"
    id = Column(Integer, primary_key=True, index=True)
    url = Column(Text, nullable=False)
    result = Column(String(20), nullable=False)  # safe/suspicious/phishing
    detail = Column(Text)
    checked_at = Column(DateTime, default=datetime.datetime.utcnow)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    user = relationship("User")

class History(Base):
    __tablename__ = "histories"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    url = Column(Text, nullable=False)
    result = Column(String(20), nullable=False)
    checked_at = Column(DateTime, default=datetime.datetime.utcnow)
    user = relationship("User", back_populates="histories") 