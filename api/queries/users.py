from queries.pool import pool
from typing import Optional, List, Union
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
    def create(self, user_in:UserIn) -> UserIn | Error:
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

    def get_all(self) -> List[UserOut] | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, username, email, password
                        FROM users
                        ORDER BY id
                        """
                    )
                    result = []
                    for record in db:
                        user = UserOut(
                            id=record[0],
                            username=record[1],
                            email=record[2],
                            password=record[3],
                        )
                        result.append(user)
                    return result

        except Exception as e:
            print(e)
            return {"message": "Could not get Users"}

    def get_one(self, user_id:int) -> Optional[UserOut] | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, username, email, password
                        FROM users
                        where id = %s
                        """,
                        [user_id]
                    )
                    record = result.fetchone()
                    if record is None:
                        return None
                    return self.record_to_user_out(record)
        except Exception as e:
            print(e)
            return {"message": "Could not get that user"}

    def delete(self, user_id:int) -> bool:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
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
