from fastapi import APIRouter, Depends, Response
from typing import List, Union
from queries.listings import (
    Error,
    ListingIn,
    ListingOut,
    ListingRepository
)

router=APIRouter()

@router.post("/listings", response_model=Union[ListingOut, Error])
def create_listing(
    listing:ListingIn,
    response: Response,
    repo: ListingRepository = Depends (),
):
        return repo.create(listing)

@router.get("/listings", response_model=Union[List[ListingOut], Error])
async def get_all(
    repo: ListingRepository = Depends(),
):
    return repo.get_all()
