from fastapi import APIRouter, Depends, Response
from queries.review import (
    Error,
    ReviewIn,
    ReviewOut,
    ReviewRepo
)
from authenticator import authenticator;

router = APIRouter()

@router.post("/{listing_id}/reviews", response_model = ReviewOut | Error)
async def create(
    listing_id: int,
    listing: ReviewIn,
    response: Response,
    repo: ReviewRepo = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data)
):
    if account == None:
        response.status_code = 401
        return Error(message="Sign in to access")
    username = account.get("username")
    result = repo.create(listing_id, listing, username)
    if result == None:
        response.status_code = 400
        return Error(message="Unable to leave a review")
    return result

@router.get("/{listing_id}/reviews", response_model = list[ReviewOut] | Error)
async def get_all_from_listing(
    listing_id: int,
    response: Response,
    repo: ReviewRepo = Depends()
):
    result = repo.get_all_from_listing(listing_id)
    if result == None:
        response.status_code = 400
        return Error(message="Unable to fetch reviews")
    return result


@router.delete("/reviews/{review_id}")
async def delete(
    review_id: int,
    response: Response,
    repo: ReviewRepo = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data)
):
    if account == None:
        response.status_code = 401
        return Error(message="Sign in to access")
    username = account.get("username")
    result = repo.delete(review_id, username)
    if result == None:
        response.status_code = 404
        result = Error(message="Invalid Review id")
    return result

@router.put("/reviews{review_id}")
async def update(
    review: ReviewIn,
    review_id: int,
    response: Response,
    repo: ReviewRepo = Depends(),
    account: dict = Depends(authenticator.try_get_current_account_data)
):
    if account == None:
        response.status_code = 401
        return Error(message="Sign in to access")
    username = account.get("username")
    result = repo.update(review, review_id, username)
    if result == None:
        response.status_code = 404
        result = Error(message="Unable to update review")
    return result
