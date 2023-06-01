from fastapi import APIRouter, Depends, Response
from typing import List
from queries.orders import (
    Error,
    OrderIn,
    OrderOut,
    OrderRepo,
    OrderOutWithListing
)
from authenticator import authenticator

router = APIRouter()

@router.post("/orders", response_model = OrderOut | Error)
async def create(
    order: OrderIn,
    response: Response,
    repo: OrderRepo = Depends(),
) -> OrderOut:
    result = repo.create(order, False)
    if result == None:
        response.status_code = 404
        result = Error(message="Unable to create order")
    return result

@router.get("/orders", response_model = List[OrderOutWithListing] | Error)
async def get_all(
    response: Response,
    repo: OrderRepo = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data)
) -> List[OrderOutWithListing] | Error:
    if account == None:
        response.status_code = 401
        return Error(message="Sign in to see all orders")
    user_id = account.get("id")
    result = repo.get_all(user_id)
    if result == None:
        response.status_code = 404
        result = Error(message="Unable to get orders")
    return result

@router.get("/{shop_id}/orders", response_model=List[OrderOutWithListing] | Error)
async def get_all_shop_orders(
    shop_id:int,
    response: Response,
    repo: OrderRepo = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data)
) -> List[OrderOutWithListing] | Error:
    if account == None:
        response.status_code = 404
        return Error(message="Sign in to see shop orders")
    result = repo.get_all_shop_orders(shop_id)
    if result == None:
        response.status_code = 404
        result = Error(message="Unable to get orders")
    return result

@router.get("/orders/{order_id}")
async def get_one(
    order_id:int,
    response: Response,
    repo: OrderRepo = Depends()
) -> OrderOut | Error:
    result = repo.get_one(order_id)
    if result == None:
        response.status_code = 404
        result = Error(message="Invalid order id")
    return result

@router.put("/orders/{order_id}", response_model = OrderOut | Error)
async def update(
    order: OrderIn,
    order_id:int,
    status:bool,
    response: Response,
    repo: OrderRepo = Depends(),
) -> OrderOut | Error:
    result = repo.update(order_id, status, order)
    if result == None:
        response.status_code = 404
        result = Error(message="Unable to update order")
    return result
