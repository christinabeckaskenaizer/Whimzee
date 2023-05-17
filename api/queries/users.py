from queries.pool import pool
from pydantic import BaseModel

class Error(BaseModel):
    message: str

class UserIn(BaseModel):
    username: str
    email: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str
    email: str
    password: str

class UserRepository(BaseModel):
    def create(self, user_in:UserIn):
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT into users
                        (username, email, password)
                        VALUES
                        (%s, %s, %s)
                        RETURNING id
                        """,
                        [
                            user_in.username,
                            user_in.email,
                            user_in.password
                            ]
                    )
                    id = result.fetchone()[0]
                    return UserOut(id=id, **user_in.dict())
        except Exception as e:
            print("User cannot be created")
            print(e)
