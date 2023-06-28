from fastapi import FastAPI
from .course import router as course

app = FastAPI()

app.include_router(
    router=course,
    prefix="/course",
    tags=["course"],
)
