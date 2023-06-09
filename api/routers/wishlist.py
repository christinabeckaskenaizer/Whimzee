from fastapi import APIRouter, Depends, Response, HTTPException
from typing import Union
from queries.wishlist import Error, WishlistIn, WishlistOut, WishlistRepository
from authenticator import authenticator

router = APIRouter()


@router.post("/wishlist", response_model=Union[WishlistOut, Error])
def create_wishlist(
    wishlist: WishlistIn,
    response: Response,
    repo: WishlistRepository = Depends(),
):
    return repo.create(wishlist)


@router.get("/wishlist/{user_id}", response_model=Union[WishlistOut, Error])
def get_a_wishlist(
    user_id: int,
    response: Response,
    repo: WishlistRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
) -> WishlistOut:
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to access")
    wishlist = repo.get_a_wishlist(user_id)
    if wishlist is None:
        raise HTTPException(
            status_code=404,
            detail="Wish list not found",
        )
    return wishlist


@router.put("/wishlist/{user_id}", response_model=Union[Error, WishlistOut])
def update_wishlist(
    user_id: int,
    wishlist: WishlistIn,
    response: Response,
    repo: WishlistRepository = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data),
) -> Union[Error, WishlistOut]:
    if account is None:
        response.status_code = 401
        return Error(message="Sign in to access")
    return repo.update_wishlist(user_id, wishlist)
