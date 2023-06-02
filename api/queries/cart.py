# from fastAPI import FastAPI()
from pydantic import BaseModel
from typing import List
from queries.pool import pool


class Error(BaseModel):
    message: str


class CartIn(BaseModel):
    user_id: int


class CartOut(BaseModel):
    id: int
    user_id: int


# class Cart_listingsIn(BaseModel):
#     cart_id:
#     listing_id: int
#     cart_quantity: int


# class Cart_listingsOut(BaseModel):
#     id: int
#     cart_id: int
#     listing_id: int
#     cart_quantity: int


# class CartOutWithDetail(BaseModel):
#     id: int
#     user_id: int
#     listing_id: int
#     quantity: int
#     name: str
#     description: str
#     price: int
#     picture: str


# class Cart_listingsOutWithDetail(BaseModel):
#     id: int
#     user_id: int
#     listing: int
#     name: str
#     description: str
#     price: int
#     picture: str


class CartRepository(BaseModel):

    def create(self, cart: CartIn) -> CartOut | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:

                    result = db.execute(
                        """
                        INSERT INTO cart
                        (user_id)
                        VALUES
                        (%s)
                        RETURNING id
                        """,
                        [cart.user_id]
                    )
                    id = result.fetchone()[0]
                    return CartOut(id=id, **cart.dict())

        except Exception as e:
            print(e)
            return None

    # def get_all(self, user_id: int) -> List[CartOutWithDetail] | Error:
    #     try:
    #         with pool.connection() as conn:
    #             with conn.cursor() as db:
    #                 db_result = db.execute(
    #                     """
    #                     SELECT cart.id, cart.user_id, cart.listing_id,
    #                     cart.quantity, listings.name, listings.description,
    #                     listings.price, listings.picture
    #                     FROM cart
    #                     JOIN listings ON cart.listing_id = listings.id
    #                     WHERE cart.user_id = %s
    #                     """,
    #                     [user_id]
    #                 )
    #                 carts = []
    #                 for rec in db_result:
    #                     carts.append(CartOutWithDetail(
    #                         id=rec[0],
    #                         user_id=rec[1],
    #                         listing_id=rec[2],
    #                         quantity=rec[3],
    #                         name=rec[4],
    #                         description=rec[5],
    #                         price=rec[6],
    #                         picture=rec[7]
    #                     ))
    #                 return carts

    #     except Exception as e:
    #         print(e)
            # return None

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

    def update(self, cart_id: int, cart: CartIn) -> CartOut | bool | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    if cart.quantity > 0:
                        db.execute(
                            """
                            update cart
                            set
                            user_id = %s,
                            WHERE id = %s
                            RETURNING (id, user_id)
                            """,
                            [cart.user_id,
                                cart_id]
                        )
                        return CartOut(id=cart_id,
                                       **cart.dict())
                    else:
                        db.execute(
                            """
                            DELETE FROM cart
                            WHERE id = %s
                            """,
                            [cart_id]
                        )
                        return True

        except Exception as e:
            print(e)
            return False


# class Cart_listingsRepository(BaseModel):

#     def create(self, cart_listings: Cart_listingsIn) -> List[Cart_listingsOut] | Error:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as db:

#                     result = db.execute(
#                         """
#                         INSERT INTO cart_listings
#                         (cart_id, listing_id, cart_quantity)
#                         VALUES
#                         (%s %s %s)
#                         RETURNING id
#                         """,
#                         [
#                             cart_listings.cart_id,
#                         ]
#                         )
#                     id = result.fetchone()[0]
#                     return Cart_listingsOut(id=id, **cart_listings.dict())

#         except Exception as e:
#             print(e)
#             return None

#     def get_all(self, listing_id: int) -> List[Cart_listingsOutWithDetail] | Error:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as db:
#                     db_result = db.execute(
#                         """
#                         SELECT cart_listings.cart_id, cart_listings.listing_id, cart_listings.cart_quantity
#                         listings.name, listings.description, listings.price, listings.picture
#                         FROM cart_listings
#                         JOIN listings ON cart_listings.listing_id = listings.id
#                         WHERE cart_listings.id = 1
#                         """,
#                     [listing_id])
#                     cartsnew = []
#                     for rec in db_result:
#                         cartsnew.append(Cart_listingsOutWithDetail(
#                             cart_id=rec[0],
#                             listing_id=rec[1],
#                             cart_quantity=rec[2],
#                             name=rec[3],
#                             description=rec[4],
#                             price=rec[5],
#                             picture=rec[6]
#                         ))
#                     return cartsnew

#         except Exception as e:
            # print(e)
            # return None
