from queries.pool import pool
from typing import Optional, List, Union
from pydantic import BaseModel

class Error(BaseModel):
    message: str

class OrderIn(BaseModel):
    user_id: int
    buyer_first_name: str
    buyer_last_name: str
    quantity: int
    listing: int
    address: str
    price: int

class OrderOut(BaseModel):
    id: int
    user_id: int
    buyer_first_name: str
    buyer_last_name: str
    quantity: int
    listing: int
    address: str
    price: int
    status: bool

class OrderRepo(BaseModel):
    def create(self, order_in:OrderIn, status:bool, user_id:int) -> OrderIn | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT into orders
                        (user_id, buyer_first_name, buyer_last_name, quantity, listing, address, price, status)
                        VALUES
                        (%s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id
                        """,
                        [
                            user_id,
                            order_in.buyer_first_name,
                            order_in.buyer_last_name,
                            order_in.quantity,
                            order_in.listing,
                            order_in.address,
                            order_in.price,
                            status
                        ]
                    )
                    id=result.fetchone()[0]
                    return OrderOut(id=id,user_id=user_id, status=status, **order_in.dict())

        except Exception as e:
            print("Order cannot be created because of: ", e)
            return {"message": "Order cannot be created"}
    def get_all(self, user_id:int) -> List[OrderOut] | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , user_id
                            , buyer_first_name
                            , buyer_last_name
                            , quantity
                            , listing
                            , address
                            , price
                            , status
                        FROM orders
                        WHERE user_id = %s
                        """,
                        [user_id]
                    )
                    return [
                        OrderOut(
                        id = record[0],
                        user_id=record[1],
                        buyer_first_name=record[2],
                        buyer_last_name=record[3],
                        quantity=record[4],
                        listing=record[5],
                        address=record[6],
                        price=record[7],
                        status=record[8]
                        ) for record in result
                    ]
        except Exception as e:
            print("Can't get orders because of: ", e)
            return None
