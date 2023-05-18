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
        pass
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
                         info.password
                         ]
                    )
                    id = result.fetchone()[0]
                    return AccountOutWithPassword(id=id, **info.dict())
        except Exception:
            return {"message": "Could not create user!"}
