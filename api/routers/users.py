from fastapi import APIRouter, Depends
from queries.users import UserRepository

router = APIRouter()


@router.delete("/users/{user_id}", response_model=bool)
def delete_user(
    user_id: int,
    repo: UserRepository = Depends(),
) -> bool:
    return repo.delete(user_id)


@router.get("/users/{email}", response_model=bool)
def get_one_user(
    email: str,
    repo: UserRepository = Depends(),
) -> bool:
    return repo.get_one(email)
