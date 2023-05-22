# from fastAPI import FastAPI()
from pydantic import BaseModel
# from typing import Optional
from queries.pool import pool


class Error(BaseModel):
    message: str


class cartIn(BaseModel):
    user_id: int


class cartOut(BaseModel):
    id: int
    user_id: int


class cartRepository(BaseModel):

    def create(self, cart: cartIn) -> cartOut | Error:
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
                    return cartOut(id=id, **cart.dict())
        # exception catch
        # update later
        except Exception as e:
            print(e)
            return None

    def get_all(self) -> list[cartOut] | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, user_id
                        FROM cart
                        ORDER BY id
                        """
                    )
                    id = result.fetchone()[0]
                    return cartOut(id=id, **cart.dict())

        except Exception as e:
            print(e)
            return None

    def update(self, cart_id: int, cart: cartIn) -> cartOut | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE cart
                        set name = %s
                        WHERE id = %s
                        """,
                        [
                            cart.name,
                            cart.cart_id
                        ]
                    )
                    return cartOut(id=cart_id, **cart.dict())

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
