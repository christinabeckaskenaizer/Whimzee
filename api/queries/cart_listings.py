from pydantic import BaseModel
from queries.pool import pool
from .listings import ListingOut


class Error(BaseModel):
    message: str


class cartListingIn(BaseModel):
    cart_id: int
    listing_id: int


class cartListingOut(BaseModel):
    id: int
    cart_id: int
    listing_id: int


class CartListingsFull(BaseModel):
    id: int
    listing: ListingOut
    num_in_cart: int = 1


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
                        [cart_listing.cart_id, cart_listing.listing_id],
                    )
                    id = result.fetchone()[0]
                    data = cart_listing.dict()
                    return cartListingOut(id=id, **data)

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
                        [cart_listing_id],
                    )
                    return True

        except Exception as e:
            print(e)
            return False

    def get_all_cart_items(self, cart_id: int) -> CartListingsFull | None:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT cart_listings.id, listings.*
                        FROM cart
                        JOIN cart_listings ON cart.id = cart_listings.cart_id
                        JOIN listings ON listings.id = cart_listings.listing_id
                        WHERE cart.id = %s
                        """,
                        [cart_id],
                    )
                    data = result.fetchall()
                    return [
                        CartListingsFull(
                            id=record[0],
                            listing=ListingOut(
                                id=record[1],
                                shop_id=record[2],
                                name=record[3],
                                quantity=record[4],
                                quantity_sold=record[5],
                                description=record[6],
                                price=record[7],
                                new=record[8],
                                picture=record[9],
                                category=record[10],
                            ),
                        )
                        for record in data
                    ]

        except Exception as e:
            print(e)
            return None
