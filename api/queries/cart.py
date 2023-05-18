# from fastAPI import FastAPI()

from pydantic import BaseModel
# from typing import Optional


class cartIn(BaseModel):
    cart_id: int


# class CartRepository(BaseModel):

#     def create(self, cart: cartIn) -> ShopOut | Error:
