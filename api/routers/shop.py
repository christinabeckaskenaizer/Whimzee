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
) -> ShopOut:
    result = repo.create(shop)
    if result == None:
        response.status_code = 404
        result = Error(message="Unable to create new shop")
    return result

@router.get("/shops", response_model = list[ShopOut] | Error)
async def get_all(
    response: Response,
    repo: ShopRepository = Depends()
):
    result = repo.get_all()
    if result == None:
        response.status_code = 404
        result = Error(message="Unable to get shops")
    return result

@router.put("/shops/{shop_id}", response_model = ShopOut | Error)
async def update(
    shop_id: int,
    shop: ShopIn,
    response: Response,
    repo: ShopRepository = Depends()
) -> ShopOut | Error:
    result = repo.update(shop_id, shop)
    if result == None:
        response.status_code = 404
        result = Error(message="Unable to get shops")
    return result

@router.delete("/shops/{shop_id}", response_model = bool | Error)
async def delete(
    shop_id: int,
    response: Response,
    repo: ShopRepository = Depends()
) -> bool | Error:
    result = repo.delete(shop_id)
    if result == None:
        response.status_code = 404
        result = Error(message="Invalid shop id")
    return result

@router.get("/shops/{shop_id}", response_model = ShopOut | Error)
async def get_one(
    shop_id: int,
    response: Response,
    repo: ShopRepository = Depends()
) -> ShopOut | Error:
    result = repo.get_one(shop_id)
    if result == None:
        response.status_code = 404
        result = Error(message="Invalid shop id")
    return result
