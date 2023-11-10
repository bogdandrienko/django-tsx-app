from datetime import datetime
from sqlalchemy import Boolean, Column, Integer, String
from sqlalchemy import (
    TIMESTAMP,
)
from database import Base


class Todo(Base):
    __tablename__ = "todo"

    id = Column(Integer, primary_key=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    is_active: bool = Column(Boolean, default=True, nullable=False)
    created_at = Column(TIMESTAMP, default=datetime.utcnow)

    __mapper_args__ = {"eager_defaults": True}

    def __repr__(self):
        return (
            f"<Todo(id={self.id}, title='{self.title}', created_at={self.created_at})>"
        )
