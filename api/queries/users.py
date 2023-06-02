from queries.pool import pool
from typing import List
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

    def create(self, user_in: UserIn) -> UserIn | Error:

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

    def get_one(self, email: str) -> bool:

        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT username
                        FROM users
                        where email = %s
                        """,
                        [email]
                    )
                    record = result.fetchone()[0]
                    print(record, "this is the record")
                    return record is not None
        except Exception as e:
            print(e)
            return False

    def delete(self, user_id: int) -> bool:

        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM users
                        WHERE id = %s
                        """,
                        [user_id]
                    )
                    return True
        except Exception as e:
            print(e)
            return False

    def record_to_user_out(self, record):
        return UserOut(
            id=record[0],
            username=record[1],
            email=record[2],
            password=record[3],
        )
