from pydantic import BaseModel
from typing import List, Optional, Union
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
    def get_a_listing(self, listing_id) -> Optional[ListingOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id,
                            shop_id,
                            name,
                            quantity,
                            quantity_sold,
                            description,
                            price,
                            new,
                            picture,
                            category
                        FROM listings
                        WHERE id = %s
                        """,
                        [listing_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_listing_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not return listing"}

    def get_all(self) -> Union[Error, List[ListingOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, shop_id, name, quantity, quantity_sold, description, price, new, picture, category
                        FROM listings
                        ORDER BY id
                        """
                    )
                    result = []
                    return [
                        ListingOut(
                            id=record[0],
                            shop_id=record[1],
                            name=record[2],
                            quantity=record[3],
                            quantity_sold=record[4],
                            description=record[5],
                            price=record[6],
                            new=record[7],
                            picture=record[8],
                            category=record[9],
                        )
                        for record in db
                    ]
        except:
            return {"message": "Could not return all listings"}

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

    def record_to_listing_out(self,record):
        return ListingOut(
            id = record[0],
            shop_id = record[1],
            name = record[2],
            quantity = record[3],
            quantity_sold = record[4],
            description = record[5],
            price = record[6],
            new = record[7],
            picture = record[8],
            category = record[9],
        )
