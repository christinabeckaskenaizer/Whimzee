from fastapi import APIRouter, Depends, Response, HTTPException
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


@router.get("/listings/{listing_id}", response_model=Union[ListingOut, Error])
def get_a_listing(
    listing_id: int,
    response: Response,
    repo: ListingRepository = Depends(),
) -> ListingOut:
    listing = repo.get_a_listing(listing_id)
    if listing is None:
        raise HTTPException(
            status_code=404,
            detail="Item not found",
        )
    return listing

@router.delete("/listings/{listing_id}", response_model=bool)
def delete_a_listing(
    listing_id: int,
    repo: ListingRepository = Depends()
    ):
    listing = repo.delete_a_listing(listing_id)
    if listing is None:
        raise HTTPException(
            status_code=404,
            detail="Could not delete a listing that does not exist",
        )
    return True

@router.put("/listings/{listing_id}", response_model=Union[Error, ListingOut])
def update_listing(
    listing_id: int,
    listing: ListingIn,
    repo: ListingRepository = Depends(),
) -> Union[Error, ListingOut]:
    return repo.update_listing(listing_id, listing)
