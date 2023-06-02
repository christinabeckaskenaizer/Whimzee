from fastapi import APIRouter, Depends, Response
from typing import List, Optional
from queries.users import (Error, UserOut, UserRepository)

router = APIRouter()

@router.get("/users", response_model=List[UserOut] | Error)
async def get_all(
    response: Response,
    repo: UserRepository = Depends()
):
    result = repo.get_all()
    if result==None:
        response.status_code = 404
        result = Error(message="Unable to get users")
    return result

@router.delete("/users/{user_id}", response_model=bool)
def delete_user(
    user_id = int,
    repo: UserRepository = Depends(),
) -> bool:
    return repo.delete(user_id)


@router.get("/users/{email}", response_model=bool)
def get_one_user(
    email: str,
    repo: UserRepository = Depends(),
) -> bool:
    return repo.get_one(email)
