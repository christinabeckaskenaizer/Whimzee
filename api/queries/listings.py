from pydantic import BaseModel
from typing import List, Union
from queries.pool import pool

class Error(BaseModel):
    message: str

class ListingIn(BaseModel):
    shop_id: int
    name: str
    quantity: int
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

class ListingRepository:
    def create(self, listing:ListingIn) -> ListingOut | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO listings
                            (shop_id,
                            name,
                            quantity,
                            description,
                            price,
                            new,
                            picture,
                            category
                            )
                        VALUES
                            (%s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id, quantity_sold;
                        """,
                        [listing.shop_id,
                        listing.name,
                        listing.quantity,
                        listing.description,
                        listing.price,
                        listing.new,
                        listing.picture,
                        listing.category
                        ]
                    )

                    tup = db.fetchone()
                    id=tup[0]
                    quantity_sold=tup[1]

                    old_data = listing.dict()

                    return ListingOut(id=id, quantity_sold=quantity_sold, **old_data)
        except Exception as e:
            print("Listing cannot be created")
            print(e)
