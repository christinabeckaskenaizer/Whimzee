from fastapi import APIRouter, Depends, Response
from typing import List
from queries.cart import Error, CartIn, CartOut, CartRepository
from authenticator import authenticator
router = APIRouter()


@router.post("/cart", response_model=CartOut | Error)
async def create(
    cart: CartIn,
    response: Response,
    repo: CartRepository = Depends(),
) -> CartOut:
    result = repo.create(cart)
    if result is None:
        response.status_code = 404
        result = Error(message="Unable to create new cart")
    return result


@router.get("/cart/{cart_id}", response_model=CartOut | Error)
async def get(
    cart_id: int,
    response: Response,
    repo: CartRepository = Depends()
):
    result = repo.get_cart(cart_id)
    if result is None:
        response.status_code = 404
        result = Error(message="Unable to get cart")
    return result


@router.put("/cart/{cart_id}", response_model=CartOut | Error)
async def update(
    cart_id: int,
    cart: CartIn,
    response: Response,
    repo: CartRepository = Depends()
) -> CartOut | Error:
    result = repo.update(cart_id, cart)
    if result is None:
        response.status_code = 404
        result = Error(message="Unable to get cart")
    return result


@router.delete("/cart/{cart_id}", response_model=bool | Error)
async def delete(
    cart_id: int,
    response: Response,
    repo: CartRepository = Depends()
) -> bool | Error:
    result = repo.delete(cart_id)
    if result is None:
        response.status_code = 404
        result = Error(message="Invalid cart id")
    return result


@router.get("/cart/", response_model=List[CartOut] | Error)
async def get_all(
    response: Response,
    repo: CartRepository = Depends()
) -> List[CartOut] | Error:
    result = repo.get_all()
    if result is None:
        response.status_code = 404
        result = Error(message="Invalid cart id")
    return result
