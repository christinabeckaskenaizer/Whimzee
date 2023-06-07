from fastapi import APIRouter, Depends, Response, HTTPException
from typing import Union
from queries.wishlist import Error, WishlistIn, WishlistOut, WishlistRepository

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
) -> WishlistOut:
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
    repo: WishlistRepository = Depends(),
) -> Union[Error, WishlistOut]:
    return repo.update_wishlist(user_id, wishlist)
