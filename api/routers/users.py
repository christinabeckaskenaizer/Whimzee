from fastapi import APIRouter, Depends, Response
from typing import List, Union, Optional
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

@router.delete("/users/{user_id}", response_model=bool)
def delete_user(
    user_id = int,
    repo: UserRepository = Depends(),
) -> bool:
    return repo.delete(user_id)

@router.get("/users/{user_id}", response_model=Optional[UserOut])
def get_one_user(
    user_id: int,
    repo: UserRepository = Depends(),
) -> UserOut:
    return repo.get_one(user_id)
