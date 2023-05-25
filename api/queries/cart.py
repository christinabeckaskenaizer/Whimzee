# from fastAPI import FastAPI()
from pydantic import BaseModel
from typing import Optional, List
from queries.pool import pool


class Error(BaseModel):
    message: str


class CartIn(BaseModel):
    user_id: int


class CartOut(BaseModel):
    id: int
    user_id: int


class Cart_listingIn(BaseModel):
    user_id: int
    listing_id: int


class Cart_listingOut(BaseModel):
    id: int
    user_id: int
    listing_id: int


class CartRepository(BaseModel):

    def create(self, cart: CartIn) -> CartOut | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    # SQL logic to create cart in our database
                    result = db.execute(
                        """
                        INSERT INTO cart
                        (user_id)
                        VALUES
                        (%s)
                        RETURNING id
                        """,
                        [
                            cart.user_id,
                        ]
                    )
                    id = result.fetchone()[0]
                    return CartOut(id=id, **cart.dict())
        # exception catch
        # update later
        except Exception as e:
            print(e)
            return None

    def get_all(self) -> List[CartOut] | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db_result = db.execute(
                        """
                        SELECT id, user_id
                        FROM cart
                        ORDER BY id
                        """
                    )
                    carts = []
                    for rec in db_result:
                        carts.append(CartOut(
                            id=rec[0],
                            user_id=rec[1]
                        ))
                    return carts

        except Exception as e:
            print(e)
            return None

    def get_cart(self, cart_id: int) -> CartOut | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db_result = db.execute(
                        """
                        SELECT id, user_id
                        FROM cart
                        WHERE id = %s
                        ORDER BY id
                        """,
                        [cart_id]
                    )
                    cart_data = db_result.fetchone()
                    return CartOut(
                        id=cart_data[0],
                        user_id=cart_data[1]
                    )
        except Exception as e:
            print(e)
            return None

    def update(self, cart_id: int, cart: CartIn) -> CartOut | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE cart
                        set user_id = %s
                        WHERE id = %s
                        """,
                        [
                            cart.user_id,
                            cart_id
                        ]
                    )
                    return CartOut(id=cart_id, **cart.dict())

        except Exception as e:
            print(e)
            return None

    def delete(self, cart_id: int) -> bool | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM cart
                        WHERE id = %s
                        """,
                        [cart_id]
                    ),
                    return True

        except Exception as e:
            print(e)
            return False

    def create_listing(self, cart: Cart_listingIn) -> Cart_listingOut | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO cart
                        (listings_id)
                        VALUES
                        (%s)
                        RETURNING id
                        """,
                        [
                            cart.listings_id,
                        ]
                    )
                    id = result.fetchone()[0]
                    return Cart_listingOut(id=id, **cart.dict())

        except Exception as e:
            print(e)
            return None
