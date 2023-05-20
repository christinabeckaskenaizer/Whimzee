from fastapi import APIRouter, Depends, Response
from typing import List
from queries.orders import (
    Error,
    OrderIn,
    OrderOut,
    OrderRepo
)
from authenticator import authenticator

router = APIRouter()

@router.post("/orders", response_model = OrderOut | Error)
async def create(
    order: OrderIn,
    response: Response,
    repo: OrderRepo = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data)
) -> OrderOut:
    if account == None:
        response.status_code = 401
        return Error(message="Sign in to create order")
    user_id = account.get("id")
    result = repo.create(order, False, int(user_id))
    if result == None:
        response.status_code = 404
        result = Error(message="Unable to create order")
    return result

@router.get("/orders", response_model = List[OrderOut] | Error)
async def get_all(
    response: Response,
    repo: OrderRepo = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data)
) -> List[OrderOut] | Error:
    if account == None:
        response.status_code = 401
        return Error(message="Sign in to see all orders")
    user_id = account.get("id")
    result = repo.get_all(user_id)
    if result == None:
        response.status_code = 404
        result = Error(message="Unable to get orders")
    return result


@router.get("orders/{order_id}")
async def get_one():
    pass

@router.put("orders/{order_id}")
async def update():
    pass
