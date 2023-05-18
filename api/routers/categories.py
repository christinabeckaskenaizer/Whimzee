from fastapi import APIRouter, Depends, Response
from typing import Union
from queries.categories import (
    Error,
    CategoryIn,
    CategoryOut,
    CategoryRepository
)

router = APIRouter()

@router.post("/categories", response_model=Union[CategoryOut, Error])
async def create_category(
    category: CategoryIn,
    response: Response,
    repo: CategoryRepository = Depends(),
):
    return repo.create(category)
