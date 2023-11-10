from datetime import datetime
from sqlalchemy import Column, Integer, String
from sqlalchemy import (
    TIMESTAMP,
)
from database import Base


class Message(Base):
    __tablename__ = "message"

    id = Column(Integer, primary_key=True)
    text = Column(String, nullable=False)
    created_at = Column(TIMESTAMP, default=datetime.now)

    __mapper_args__ = {"eager_defaults": True}

    def __repr__(self):
        return f"<Todo(id={self.id}, title='{self.text[:50] + '...' if len(self.text) > 50 else self.text}', created_at={self.created_at})>"
