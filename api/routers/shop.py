from fastapi import APIRouter, Depends, Response
from queries.shop import (
    Error,
    ShopIn,
    ShopOut,
    ShopRepository
)
from authenticator import authenticator

router = APIRouter()

@router.post("/shops", response_model = ShopOut | Error)
async def create(
    shop: ShopIn,
    response: Response,
    repo: ShopRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data)
) -> ShopOut:
    if account == None:
        response.status_code = 401
        return Error(message="Sign in to access")
    user_id = account.get("id")
    result = repo.create(shop, int(user_id))
    if result == None:
        response.status_code = 404
        result = Error(message="Unable to create new shop")
    return result

@router.put("/shops/{shop_id}", response_model = ShopOut | Error)
async def update(
    shop_id: int,
    shop: ShopIn,
    response: Response,
    repo: ShopRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data)
) -> ShopOut | Error:
    if account == None:
        response.status_code = 401
        return Error(message="Sign in to access")
    user_id = account.get("id")
    result = repo.update(shop_id, shop, int(user_id))
    if result == None:
        response.status_code = 404
        result = Error(message="Unable to update shop")
    return result

@router.delete("/shops/{shop_id}", response_model = bool | Error)
async def delete(
    shop_id: int,
    response: Response,
    repo: ShopRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data)
) -> bool | Error:
    if account == None:
        response.status_code = 401
        return Error(message="Sign in to access")
    user_id = account.get("id")
    result = repo.delete(shop_id, int(user_id))
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
