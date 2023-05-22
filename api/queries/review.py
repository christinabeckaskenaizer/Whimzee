from queries.pool import pool
from pydantic import BaseModel
from datetime import date

class Error(BaseModel):
    message: str

class ReviewIn(BaseModel):
    rating: int
    description: str

class ReviewOut(BaseModel):
    id: int
    author: str
    rating: int
    listing_id: int
    created_on: date
    description: str

class ReviewRepo(BaseModel):

    def create(self, listing_id: int, review: ReviewIn, username: str) -> ReviewOut | None:
        try:
            today = date.today()
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        INSERT INTO reviews
                          (author, rating, listing, created_on, description)
                        VALUES
                          (%s, %s, %s, %s, %s)
                        RETURNING *
                        """,
                        [
                          username,
                          review.rating,
                          listing_id,
                          today,
                          review.description
                        ]
                    )
                    data = result.fetchone()
                    return ReviewOut(
                          id = data[0],
                          author = data[1],
                          rating = data[2],
                          listing_id = data[3],
                          created_on = data[4],
                          description= data[5]
                        )

        except Exception as e:
            print(e)
            return None

    def get_all_from_listing(self, listing_id: int) -> ReviewOut | None:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        SELECT *
                        FROM reviews
                        WHERE listing = %s
                        """,
                        [listing_id]
                    )
                    return [ReviewOut(
                        id = record[0],
                        author = record[1],
                        rating = record[2],
                        listing_id = record[3],
                        created_on = record[4],
                        description= record[5]
                      ) for record in result]

        except Exception as e:
            print(e)
            return None

    def delete(self, review_id: int, username: str) -> bool | None:
        try:
            with pool.connection()as conn:
                with conn.cursor() as db:
                    db.execute(
                        """
                        DELETE FROM reviews
                        WHERE id = %s and
                            author = %s
                        """,
                        [
                          review_id,
                          username
                        ]
                    )
                    return True

        except Exception as e:
            print(e)
            return None

    def update(self, review: ReviewIn, review_id: int, username: str) -> ReviewOut | None:
        try:
            with pool.connection() as conn:
                with conn.cursor() as db:
                    result = db.execute(
                        """
                        UPDATE reviews
                        SET rating = %s
                            , description = %s
                        WHERE id = %s and
                            author = %s
                        RETURNING *
                        """,
                        [
                            review.rating,
                            review.description,
                            review_id,
                            username
                        ]
                    )
                    data = result.fetchone()
                    return ReviewOut(
                          id = data[0],
                          author = data[1],
                          rating = data[2],
                          listing_id = data[3],
                          created_on = data[4],
                          description= data[5]
                        )

        except Exception as e:
            print(e)
            return None
