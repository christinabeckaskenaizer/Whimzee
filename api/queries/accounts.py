from pydantic import BaseModel
from queries.pool import pool


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

class AccountOutWithPassword(AccountOut):
    hashed_password: str

class AccountQueries(BaseModel):
    def get(self, email:str) -> AccountOutWithPassword:
        print(email)
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
                    print("This is the records: ", records)
                    return AccountOutWithPassword(id=records[0], email=records[2], username=records[1], hashed_password=records[3])



        except Exception:
            return {"message": "Could not get accounts!"}


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
