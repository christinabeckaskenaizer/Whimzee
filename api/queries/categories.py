from pydantic import BaseModel
from typing import List, Union
from queries.pool import pool


class Error(BaseModel):
    message: str

class CategoryIn(BaseModel):
    name: str

class CategoryOut(BaseModel):
    id: int
    name: str



class CategoryRepository:
    def get_all(self) -> Union[Error, List[CategoryOut]]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT id, name
                        FROM categories
                        ORDER BY id
                        """
                        )
                    result = []
                    return [
                        CategoryOut(
                            id=record[0],
                            name=record[1],
                        )
                        for record in db
                    ]
        except Exception:
            return {"message": "Could not return all categories"}

    def create(self, category:CategoryIn) -> CategoryOut | Error:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO categories
                            (name)
                        VALUES
                            (%s)
                        RETURNING id;
                        """,
                        [category.name]
                    )
                    id = result.fetchone()[0]
                    old_data = category.dict()

                    return CategoryOut(id=id, **old_data)
        except Exception as e:
            print("Category cannot be created")
            print(e)
