from fastapi import APIRouter, Depends, Response
from typing import List, Union
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

@router.get("/categories", response_model=Union[List[CategoryOut], Error])
async def get_all(
    repo: CategoryRepository = Depends(),
):
    return repo.get_all()
