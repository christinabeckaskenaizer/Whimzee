from pydantic import BaseModel

from typing import Optional, Union
from queries.pool import pool


class Error(BaseModel):
    message: str


class WishlistIn(BaseModel):
    user_id: int
    listings: list[int] = []


class WishlistOut(BaseModel):
    id: int
    user_id: int
    listings: list[int]


class WishlistRepository:
    def update_wishlist(
        self, user_id: int, wishlist: WishlistIn
    ) -> Union[WishlistOut, Error]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE wishlist
                        SET listings=%s
                        WHERE user_id=%s
                        RETURNING
                            (id,
                            user_id,
                            listings)
                        """,
                        [wishlist.listings, user_id],
                    )
                    # old_data = wishlist.dict()
                    updated_listing = result.fetchone()
                    print("LOOKY HERE!!!!!", updated_listing)
                    if updated_listing:
                        id = updated_listing[0][0]
                        user_id = updated_listing[0][1]
                        listings = updated_listing[0][2]
                        print("listings", listings)
                        listings = listings.replace("{", "")
                        listings = listings.replace("}", "")
                        listings = listings.split(",")

                        for idx in range(len(listings)):
                            listings[idx] = int(listings[idx])

                        print("item")
                        print("listingsss", listings)
                        print(type(listings))
                        return WishlistOut(
                            id=id, user_id=user_id, listings=listings
                        )
                    else:
                        return Error(message="Wishlist not found")
                    # user_id=updated_listing[]
        except Exception as e:
            print(e)
            return {"message": "Could not update wishlist"}

    def get_a_wishlist(self, user_id) -> Optional[WishlistOut]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        SELECT id,
                            user_id,
                            listings
                        FROM wishlist
                        WHERE user_id = %s
                        """,
                        [user_id],
                    )
                    record = db.fetchone()
                    if record is None:
                        return None
                    return self.record_to_wishlist_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not return wishlist"}

    def create(self, wishlist: WishlistIn) -> WishlistOut | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        INSERT INTO wishlist
                            (user_id, listings)
                        VALUES
                            (%s, %s)
                        RETURNING id, user_id, listings;
                        """,
                        [wishlist.user_id, wishlist.listings],
                    )

                    tup = db.fetchone()
                    print("TUP", tup)
                    id = tup[0]
                    listings = tup[2]

                    if listings is None:
                        listings = []

                    old_data = wishlist.dict()
                    print("old data", old_data)

                    return WishlistOut(id=id, **old_data)
        except Exception as e:
            print("wish list cannot be created")
            print(e)

    def record_to_wishlist_out(self, record):
        return WishlistOut(id=record[0], user_id=record[1], listings=record[2])
