from queries.pool import pool
from typing import Optional, List, Union
from pydantic import BaseModel

class Error(BaseModel):
    message: str

class OrderIn(BaseModel):
    buyer_first_name: str
    buyer_last_name: str
    quantity: int
    listing: int
    address: str
    price: int

class OrderOut(BaseModel):
    id: int
    buyer_first_name: str
    buyer_last_name: str
    quantity: int
    listing: int
    address: str
    price: int
    status: bool

class OrderRepo(BaseModel):
    def create(self, order_in:OrderIn, status:bool) -> OrderIn | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT into orders
                        (buyer_first_name, buyer_last_name, quantity, listing, address, price, status)
                        VALUES
                        (%s, %s, %s, %s, %s, %s, %s)
                        RETURNING id
                        """,
                        [
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
                    return OrderOut(id=id, status=status, **order_in.dict())

        except Exception as e:
            print("Order cannot be created because of: ", e)
            return {"message": "Order cannot be created"}
