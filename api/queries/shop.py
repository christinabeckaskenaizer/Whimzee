from queries.pool import pool
from pydantic import BaseModel

class Error(BaseModel):
    message: str

class ShopIn(BaseModel):
    user_id: int
    name: str
    profile_picture: str
    email: str
    description: str

class ShopOut(BaseModel):
    id: int
    user_id: int
    name: str
    profile_picture: str
    email: str
    description: str

class ShopRepository(BaseModel):

    def create(self, shop: ShopIn) -> ShopOut | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    #SQL logic to create shop in our database
                    result = db.execute(
                        """
                        INSERT INTO shops
                          (user_id, name, profile_picture, email, description)
                        VALUES
                          (%s, %s, %s, %s, %s)
                        RETURNING id
                        """,
                        [
                            shop.user_id,
                            shop.name,
                            shop.profile_picture,
                            shop.email,
                            shop.description
                        ]
                    )
                    id = result.fetchone()[0]
                    return ShopOut(id=id, **shop.dict())
        except Exception as e:
            print(e)
            # return {"error": "unable to create shop"}


    def get_all(self):
        print("ends at list_all")

    def update(self):
        print("ends at update")

    def delete(self):
        pass

    def get_one(self):
        pass
