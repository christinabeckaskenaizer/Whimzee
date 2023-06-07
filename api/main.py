from fastapi import APIRouter, FastAPI
from authenticator import authenticator
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import (
    users,
    shop,
    accounts,
    categories,
    listings,
    review,
    orders,
    cart,
    cart_listings,
    wishlist,
)

router = APIRouter()

app = FastAPI()

origins = [
    "http://localhost:3000",
    os.environ.get("CORS_HOST", None),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# routers from our routers folder
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(users.router)
app.include_router(shop.router)
app.include_router(cart.router)
app.include_router(cart_listings.router)
app.include_router(categories.router)
app.include_router(listings.router)
app.include_router(orders.router)
app.include_router(review.router)
app.include_router(wishlist.router)


@app.get("/")
def root():
    return {"message": "Hello World"}
