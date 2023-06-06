# from pydantic import BaseModel

# from typing import List, Optional, Union
# from queries.pool import pool


# class Error(BaseModel):
#     message: str


# class WishlistIn(BaseModel):
#     user_id: int


# class WishlistOut(BaseModel):
#     id: int
#     user_id: int
#     listings: list[int]


# class WishlistRepository:
#     def update_wishlist(
#         self, wishlist_id: int, wishlist: WishlistIn
#     ) -> Union[WishlistOut, Error]:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as db:
#                     result = db.execute(
#                         """
#                         UPDATE wishlist
#                         SET listings=%s
#                         WHERE id=%s
#                         RETURNING
#                             (id,
#                             user_id,
#                             listings)
#                         """,
#                         [wishlist.id, wishlist.user_id, wishlist.listings],
#                     )
#                     old_data = wishlist.dict()
#                     updated_wishlist = result.fetchone()
#                     quantity_sold = updated_wishlist[0][4]
#                     return WishlistOut(
#                         id=wishlist_id, quantity_sold=quantity_sold, **old_data
#                     )

#         except Exception as e:
#             print(e)
#             return {"message": "Could not update wishlist"}

#     def get_a_listing(self, listing_id) -> Optional[WishlistOut]:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as db:
#                     db.execute(
#                         """
#                         SELECT id,
#                             shop_id,
#                             name,
#                             quantity,
#                             quantity_sold,
#                             description,
#                             price,
#                             new,
#                             picture,
#                             category
#                         FROM listings
#                         WHERE id = %s
#                         """,
#                         [listing_id],
#                     )
#                     record = db.fetchone()
#                     if record is None:
#                         return None
#                     return self.record_to_listing_out(record)
#         except Exception as e:
#             print(e)
#             return {"message": "Could not return listing"}

#     def create(self, listing: WishlistIn) -> WishlistOut | Error:
#         try:
#             with pool.connection() as conn:
#                 with conn.cursor() as db:
#                     db.execute(
#                         """
#                         INSERT INTO listings
#                             (shop_id,
#                             name,
#                             quantity,
#                             description,
#                             price,
#                             new,
#                             picture,
#                             category
#                             )
#                         VALUES
#                             (%s, %s, %s, %s, %s, %s, %s, %s)
#                         RETURNING id, quantity_sold;
#                         """,
#                         [
#                             listing.shop_id,
#                             listing.name,
#                             listing.quantity,
#                             listing.description,
#                             listing.price,
#                             listing.new,
#                             listing.picture,
#                             listing.category,
#                         ],
#                     )

#                     tup = db.fetchone()
#                     id = tup[0]
#                     quantity_sold = tup[1]

#                     old_data = listing.dict()

#                     return WishlistOut(
#                         id=id, quantity_sold=quantity_sold, **old_data
#                     )
#         except Exception as e:
#             print("Listing cannot be created")
#             print(e)

#     def record_to_listing_out(self, record):
#         return WishlistOut(
#             id=record[0],
#             shop_id=record[1],
#             name=record[2],
#             quantity=record[3],
#             quantity_sold=record[4],
#             description=record[5],
#             price=record[6],
#             new=record[7],
#             picture=record[8],
#             category=record[9],
#         )
