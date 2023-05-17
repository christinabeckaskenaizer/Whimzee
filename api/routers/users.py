from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.users import (Error, UserIn, UserOut, UserRepository)

router = APIRouter()

@router.post("/users", response_model = UserOut)
async def create(
    user:UserIn,
    repo:UserRepository=Depends()
):
    return repo.create(user)

@router.get("/users", response_model = List[UserOut])
async def get_all(
    response: Response,
    repo: UserRepository = Depends()
):
    return repo.get_all()
