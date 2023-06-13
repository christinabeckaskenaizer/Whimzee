steps = [
    [
        """
        DROP TABLE orders
        """,
        """
        DROP TABLE orders
        """,
    ],
    [
        """
        CREATE TABLE orders (
          id SERIAL PRIMARY KEY NOT NULL,
          user_id INT NOT NULL,
          shop_id INT NOT NULL,
          buyer_first_name VARCHAR(200) NOT NULL,
          buyer_last_name VARCHAR(200) NOT NULL,
          quantity INT NOT NULL,
          listing INT NOT NULL,
          status BOOLEAN NOT NULL,
          address TEXT NOT NULL,
          price NUMERIC NOT NULL
        );
        """,
        """
        DROP TABLE orders
        """,
    ],
]
