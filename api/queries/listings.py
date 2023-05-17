from pydantic import BaseModel

class ListingIn(BaseModel):
    shop_id: int
    name: str
    quantity: int
    quantity_sold: int
    description: str
    price: int
    new: bool
    picture: str
    category: int


class ListingOut(BaseModel):
    id: int
    shop_id: int
    name: str
    quantity: int
    quantity_sold: int
    description: str
    price: int
    new: bool
    picture: str
    category: int
