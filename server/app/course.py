from fastapi import APIRouter, Depends, HTTPException

router = APIRouter()

@router.get("/get-all-courses")
async def get_all_courses():
    return {"message": "Get all courses"}
