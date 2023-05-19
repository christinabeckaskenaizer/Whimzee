from fastapi import APIRouter, Depends, Response
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
) -> OrderOut:
    result = repo.create(order, False)
    if result == None:
        response.status_code = 404
        result = Error(message="Unable to create the order")
    return result
