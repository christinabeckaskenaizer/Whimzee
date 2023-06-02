from pydantic import BaseModel
from queries.pool import pool


class Error(BaseModel):
    message: str


class cartListingIn(BaseModel):
    cart_id: int
    listing_id: int


class cartListingOut(BaseModel):
    id: int
    cart_id: int
    listing_id: int


class cartListingRepository(BaseModel):

    def create(self, cart_listing: cartListingIn) -> cartListingOut | None:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO cart_listings
                            (cart_id, listing_id)
                        VALUES
                            (%s, %s)
                        RETURNING id
                        """,
                        [
                            cart_listing.cart_id,
                            cart_listing.listing_id
                        ]
                    )
                    id = result.fetchone()[0]
                    print("this is the id", id)
                    data = cart_listing.dict()
                    print("this is the data", data)
                    return cartListingOut(
                        id=id, **data
                    )

        except Exception as e:
            print(e)
            return None

    def delete(self, cart_listing_id: int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM cart_listings
                        WHERE id = %s
                        """,
                        [cart_listing_id]
                    )
                    return True

        except Exception as e:
            print(e)
            return False
