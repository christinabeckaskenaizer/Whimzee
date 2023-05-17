from fastapi import APIRouter, Depends
from queries.users import (Error, UserIn, UserOut, UserRepository)

router = APIRouter()

@router.post("/users", response_model = UserOut)
async def create(
    user:UserIn,
    repo:UserRepository=Depends()
):
    return repo.create(user)
