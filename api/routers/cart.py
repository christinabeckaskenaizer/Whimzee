from fastapi import APIRouter

# from routers import users
from queries.cart import cartIn

router = APIRouter()
# app = FastAPI()
# app.include_router(users.router)


@router.post("/cart")
def create_cart(cart: cartIn):
    print('cart', cart.cart_id)
    return cart
