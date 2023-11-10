import datetime

from pydantic import BaseModel


class MessageBase(BaseModel):
    text: str


class MessageCreate(MessageBase):
    pass


class MessageUpdate(MessageBase):
    pass


class Message(MessageBase):
    id: int
    created_at: datetime.datetime

    class Config:
        from_attributes = True
