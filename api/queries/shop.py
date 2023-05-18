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
        #exception catch
        #update later
        except Exception as e:
            print(e)
            return None

    def get_all(self) -> list[ShopOut] | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, user_id, name, profile_picture, email, description
                        FROM shops
                        ORDER BY name
                        """
                    )
                    return [
                        ShopOut(
                        id = record[0],
                        user_id = record[1],
                        name  = record[2],
                        profile_picture = record[3],
                        email = record[4],
                        description = record[5]
                        ) for record in result
                    ]
        #exception catch
        except Exception as e:
            print(e)
            return None

    def update(self, shop_id: int, shop: ShopIn) -> ShopOut | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        UPDATE shops
                        set name = %s
                            , profile_picture = %s
                            , email = %s
                            , description = %s
                        WHERE id = %s
                        """,
                        [
                            shop.name,
                            shop.profile_picture,
                            shop.email,
                            shop.description,
                            shop_id
                        ]
                    )
                    return ShopOut(id=shop_id, **shop.dict())

        except Exception as e:
            print(e)
            return None

    def delete(self, shop_id: int) -> bool | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM shops
                        WHERE id = %s
                        """,
                        [shop_id]
                    ),
                    return True

        except Exception as e:
            print(e)
            return False

    def get_one(self, shop_id: int) -> ShopOut | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id
                            , user_id
                            , name
                            , profile_picture
                            , email
                            , description
                        FROM shops
                        WHERE id = %s
                        """,
                        [shop_id]
                    )
                    data = result.fetchone()
                    return ShopOut(
                        id = data[0],
                        user_id = data[1],
                        name = data[2],
                        profile_picture = data[3],
                        email = data[4],
                        description = data[5]
                    )

        except Exception as e:
            print(e)
            return None