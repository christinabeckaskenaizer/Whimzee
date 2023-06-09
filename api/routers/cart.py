from fastapi import APIRouter, Depends, Response
from queries.cart import Error, CartIn, CartOut, CartRepository


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
    cart_id: int, response: Response, repo: CartRepository = Depends()
):
    result = repo.get_cart(cart_id)
    if result is None:
        response.status_code = 404
        result = Error(message="Unable to get cart")
    return result


@router.delete("/cart/{cart_id}", response_model=bool | Error)
async def delete(
    cart_id: int, response: Response, repo: CartRepository = Depends()
) -> bool | Error:
    result = repo.delete(cart_id)
    if result is None:
        response.status_code = 404
        result = Error(message="Invalid cart id")
    return result


# @router.get("/cart/user/{user_id}",
# response_model=List[CartOutWithDetail] | Error)
# async def get_user_cart(
#     user_id: int,
#     response: Response,
#     repo: CartRepository = Depends()
# ) -> List[CartOutWithDetail] | Error:
#     result = repo.get_all(user_id)
#     if result is None:
#         response.status_code = 404
#         result = Error(message="Invalid cart id")
#     return result


# @router.post("/{cart_listings_id}", response_model=Cart_listingsOut | Error)
# async def createcart(
#     cart_listings: Cart_listingsIn,
#     response: Response,
#     repo: Cart_listingsRepository = Depends(),
# ) -> Cart_listingsOut:
#     result = repo.create(cart_listings_id)
#     if result is None:
#         response.status_code = 404
#         result = Error(message="Unable to create new cart_listings")
#     return result
