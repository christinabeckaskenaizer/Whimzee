from pydantic import BaseModel
from queries.pool import pool


class Error(BaseModel):
    message: str

class CategoryIn(BaseModel):
    name: str

class CategoryOut(BaseModel):
    id: int
    name: str

class CategoryRepository:
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
