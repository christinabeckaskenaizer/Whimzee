from fastapi import APIRouter, Depends, Response
from queries.cart_listings import (
    Error,
    cartListingIn,
    cartListingOut,
    CartListingsFull,
    cartListingRepository,
)

router = APIRouter()


@router.get(
    "/cart_listings/{cart_id}", response_model=list[CartListingsFull] | Error
)
async def get_all(
    cart_id: int,
    response: Response,
    repo: cartListingRepository = Depends(),
):
    result = repo.get_all_cart_items(cart_id)
    if result is None:
        response.status_code = 400
        result = Error(message="Unable to get new cart_listing")
    return result


@router.post("/cart_listings", response_model=cartListingOut | None)
async def create(
    cart_listing: cartListingIn,
    response: Response,
    repo: cartListingRepository = Depends(),
):
    result = repo.create(cart_listing)
    if result is None:
        response.status_code = 400
        result = Error(message="Unable to create new cart_listing")
    return result


@router.delete("/cart_listings/{cart_listing_id}", response_model=bool)
async def delete(
    cart_listing_id: int,
    response: Response,
    repo: cartListingRepository = Depends(),
):
    result = repo.delete(cart_listing_id)
    if result is False:
        response.status_code = 400
        result = Error(message="unable to process delete request")
    return result
