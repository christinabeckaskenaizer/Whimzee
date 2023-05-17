from fastapi import APIRouter, Depends, Response
from queries.shop import (
    Error,
    ShopIn,
    ShopOut,
    ShopRepository
)

router = APIRouter()

@router.post("/shops", response_model = ShopOut | Error)
async def create(
    shop: ShopIn,
    response: Response,
    repo: ShopRepository = Depends(),
):
    return repo.create(shop)

@router.get("/shops", response_model = list[ShopOut] | Error)
async def get_all(
    response: Response,
    repo: ShopRepository = Depends()
):
    return repo.get_all()

@router.put("/shops/{shop_id}", response_model = ShopOut | Error)
async def update(
    shop_id: int,
    shop: ShopIn,
    repo: ShopRepository = Depends()
) -> ShopOut | Error:
    return repo.update(shop_id, shop)


@router.delete("/shops/{shop_id}")
async def delete():
    pass

@router.get("/shops/{shop_id}")
async def get_one():
    pass
