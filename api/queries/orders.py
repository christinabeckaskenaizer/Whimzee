from queries.pool import pool
from typing import List
from pydantic import BaseModel
from .listings import ListingOut


class Error(BaseModel):
    message: str


class OrderIn(BaseModel):
    shop_id: int
    buyer_first_name: str
    buyer_last_name: str
    quantity: int
    listing: int
    address: str
    price: int


class OrderInWithStatus(BaseModel):
    status: bool


class OrderOut(BaseModel):
    id: int
    user_id: int
    shop_id: int
    buyer_first_name: str
    buyer_last_name: str
    quantity: int
    listing: int
    address: str
    price: int
    status: bool


class OrderOutWithListing(BaseModel):
    id: int
    user_id: int
    shop_id: int
    buyer_first_name: str
    buyer_last_name: str
    quantity: int
    listing: ListingOut
    address: str
    price: int
    status: bool


class OrderRepo(BaseModel):
    def create(
        self, order_in: OrderIn, status: bool, user_id: int
    ) -> OrderIn | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT into orders
                        (user_id,
                        shop_id,
                        buyer_first_name,
                        buyer_last_name,
                        quantity,
                        listing,
                        address,
                        price,
                        status)
                        VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id
                        """,
                        [
                            user_id,
                            order_in.shop_id,
                            order_in.buyer_first_name,
                            order_in.buyer_last_name,
                            order_in.quantity,
                            order_in.listing,
                            order_in.address,
                            order_in.price,
                            status,
                        ],
                    )
                    id = result.fetchone()[0]
                    return OrderOut(
                        id=id,
                        status=status,
                        user_id=user_id,
                        **order_in.dict()
                    )

        except Exception as e:
            print("Order cannot be created because of: ", e)
            return None

    def get_all_shop_orders(
        self, shop_id: int
    ) -> List[OrderOutWithListing] | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT o.* as listing_id, l.*
                        FROM orders o
                        LEFT OUTER JOIN listings l
                        ON o.listing = l.id
                        WHERE o.shop_id = %s
                        """,
                        [shop_id],
                    )
                    data = result.fetchall()
                    print(data)
                    return [
                        OrderOutWithListing(
                            id=record[0],
                            user_id=record[1],
                            shop_id=record[2],
                            buyer_first_name=record[3],
                            buyer_last_name=record[4],
                            quantity=record[5],
                            listing=ListingOut(
                                id=record[10],
                                shop_id=record[11],
                                name=record[12],
                                quantity=record[13],
                                quantity_sold=record[14],
                                description=record[15],
                                price=record[16],
                                new=record[17],
                                picture=record[18],
                                category=record[19],
                            ),
                            address=record[8],
                            price=record[9],
                            status=record[7],
                        )
                        for record in data
                    ]
        except Exception as e:
            print("Can't get orders because of: ", e)
            return None

    def get_all(self, user_id: int) -> List[OrderOutWithListing] | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT o.* as listing_id, l.*
                        FROM orders o
                        LEFT OUTER JOIN listings l
                        ON o.listing = l.id
                        WHERE o.user_id = %s
                        """,
                        [user_id],
                    )
                    data = result.fetchall()
                    return [
                        OrderOutWithListing(
                            id=record[0],
                            user_id=record[1],
                            shop_id=record[2],
                            buyer_first_name=record[3],
                            buyer_last_name=record[4],
                            quantity=record[5],
                            listing=ListingOut(
                                id=record[10],
                                shop_id=record[11],
                                name=record[12],
                                quantity=record[13],
                                quantity_sold=record[14],
                                description=record[15],
                                price=record[16],
                                new=record[17],
                                picture=record[18],
                                category=record[19],
                            ),
                            address=record[8],
                            price=record[9],
                            status=record[7],
                        )
                        for record in data
                    ]
        except Exception as e:
            print("Can't get orders because of: ", e)
            return None

    def get_one(self, order_id: int) -> OrderOut | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , user_id
                            , shop_id
                            , buyer_first_name
                            , buyer_last_name
                            , quantity
                            , listing
                            , address
                            , price
                            , status
                        FROM orders
                        WHERE id = %s
                        """,
                        [order_id],
                    )
                    record = result.fetchone()
                    return OrderOut(
                        id=record[0],
                        user_id=record[1],
                        shop_id=record[2],
                        buyer_first_name=record[3],
                        buyer_last_name=record[4],
                        quantity=record[5],
                        listing=record[6],
                        address=record[7],
                        price=record[8],
                        status=record[9],
                    )
        except Exception as e:
            print("Can't get order because of: ", e)
            return None

    def update(
        self, order_id: int, order: OrderInWithStatus
    ) -> OrderOut | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE orders
                        set status = %s
                        WHERE id = %s
                        RETURNING *
                        """,
                        [order.status, order_id],
                    )
                    record = result.fetchall()[0]
                    print(record)
                    return OrderOut(
                        id=record[0],
                        user_id=record[1],
                        shop_id=record[2],
                        buyer_first_name=record[3],
                        buyer_last_name=record[4],
                        quantity=record[5],
                        listing=record[6],
                        status=record[7],
                        address=record[8],
                        price=record[9],
                    )
        except Exception as e:
            print("Yoooohoo", e)
            return None
