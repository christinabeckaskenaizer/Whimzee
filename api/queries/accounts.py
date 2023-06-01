from pydantic import BaseModel
from queries.pool import pool
# from cart import CartRepository


class DuplicateAccountError(ValueError):
    pass

class AccountIn(BaseModel):
    username: str
    email: str
    password: str

class AccountOut(BaseModel):
    id: str
    username: str
    email: str

class AccountIDS(BaseModel):
    id: int
    shop_id: int | None
    cart_id: int | None

class AccountOutWithPassword(AccountOut):
    hashed_password: str

class AccountQueries(BaseModel):
    def get(self, email:str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, username, email, password
                        FROM users
                        WHERE email = %s
                        """,
                        [email]
                    )
                    records = result.fetchone()
                    return AccountOutWithPassword(id=records[0], email=records[2], username=records[1], hashed_password=records[3])
        except Exception:
            print("Could not get accounts!")
            return None


    def create(self, info:AccountIn, hashed_password:str) -> AccountOutWithPassword:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO users
                        (username, email, password)
                        VALUES
                        (%s, %s, %s)
                        RETURNING id
                        """,
                        [info.username,
                         info.email,
                         hashed_password
                         ]
                    )
                    id = result.fetchone()[0]
                    return AccountOutWithPassword(id=id, email=info.email, username=info.username, hashed_password=hashed_password)


        except Exception:
            return {"message": "Could not create account!"}


    def get_ids_for_user(self, user: int) -> AccountIDS:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT u.id, s.id as shop_id, c.id as cart_id
                        FROM users u
                        LEFT OUTER JOIN shops s
                        ON s.user_id = %s
                        LEFT OUTER JOIN cart c
                        ON c.user_id = %s
                        WHERE u.id = %s
                        """,
                        [
                            user,
                            user,
                            user,
                        ]
                    )
                    data = result.fetchone()
                    return AccountIDS(
                        id = data[0],
                        shop_id = data[1],
                        cart_id = data[2]
                    )

        except Exception as e:
            print(e)
            return None
