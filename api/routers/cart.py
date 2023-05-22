from fastapi import APIRouter, Depends, Response

# from routers import users
from queries.cart import Error, cartIn, cartOut, cartRepository
from authenticator import authenticator
router = APIRouter()
# app = FastAPI()
# app.include_router(users.router)


# @router.post("/cart")
# def create_cart(cart: cartIn):
#     print('cart', cart.cart_id)
#     return cart


router = APIRouter()


@router.post("/cart", response_model=cartOut | Error)
async def create(
    cart: cartIn,
    response: Response,
    repo: cartRepository = Depends(),
) -> cartOut:
    result = repo.create(cart)
    if result is None:
        response.status_code = 404
        result = Error(message="Unable to create new cart")
    return result


@router.get("/cart/{cart_id}", response_model=list[cartOut] | Error)
async def get_all(
    response: Response,
    repo: cartRepository = Depends()
):
    result = repo.get_all()
    if result is None:
        response.status_code = 404
        result = Error(message="Unable to get cart")
    return result


@router.put("/cart/{cart_id}", response_model=cartOut | Error)
async def update(
    cart_id: int,
    cart: cartIn,
    response: Response,
    repo: cartRepository = Depends()
) -> cartOut | Error:
    result = repo.update(cart_id, cart)
    if result is None:
        response.status_code = 404
        result = Error(message="Unable to get cart")
    return result


@router.delete("/cart/{cart_id}", response_model=bool | Error)
async def delete(
    cart_id: int,
    response: Response,
    repo: cartRepository = Depends()
) -> bool | Error:
    result = repo.delete(cart_id)
    if result is None:
        response.status_code = 404
        result = Error(message="Invalid cart id")
    return result


@router.get("/cart/{cart_id}", response_model=cartOut | Error)
async def get_one(
    cart_id: int,
    cart: cartIn,
    response: Response,
    repo: cartRepository = Depends()
) -> cartOut | Error:
    result = repo.get_one(cart_id)
    if result is None:
        response.status_code = 404
        result = Error(message="Invalid cart id")
    return result
