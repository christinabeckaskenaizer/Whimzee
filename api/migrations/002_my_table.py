steps = [
    [
        """
        CREATE TABLE users (
          id SERIAL PRIMARY KEY NOT NULL,
          username VARCHAR(200) UNIQUE NOT NULL,
          email VARCHAR(200) UNIQUE NOT NULL,
          password VARCHAR(200) NOT NULL
        );
        """,
        """
        DROP TABLE users
        """,
    ],
    [
        """
        CREATE TABLE shops (
          id SERIAL PRIMARY KEY NOT NULL,
          user_id INT UNIQUE REFERENCES users (id) ON DELETE CASCADE,
          name VARCHAR(100) NOT NULL,
          profile_picture TEXT,
          email VARCHAR(200) NOT NULL,
          description TEXT
        );
        """,
        """
        DROP TABLE shops
        """,
    ],
    [
        """
        CREATE TABLE categories (
          id SERIAL PRIMARY KEY NOT NULL,
          name VARCHAR(100) NOT NULL
        );
        """,
        """
        DROP TABLE categories
        """,
    ],
    [
        """
        INSERT INTO categories (name)
        VALUES
          ('outdoors'),
          ('clothing'),
          ('office'),
          ('home goods'),
          ('pets'),
          ('collectibles'),
          ('beauty'),
          ('accessories'),
          ('other');
        """,
        """
        """,
    ],
    [
        """
        CREATE TABLE listings (
          id SERIAL PRIMARY KEY NOT NULL,
          shop_id INT REFERENCES shops (id) ON DELETE CASCADE,
          name VARCHAR(100) NOT NULL,
          quantity INT NOT NULL,
          quantity_sold INT DEFAULT 0,
          description TEXT,
          price NUMERIC(8, 2) NOT NULL,
          new BOOLEAN NOT NULL,
          picture TEXT NOT NULL,
          category INT REFERENCES categories (id)
        );
        """,
        """
        DROP TABLE listings
        """,
    ],
    [
        """
        CREATE TABLE cart (
          id SERIAL PRIMARY KEY NOT NULL,
          user_id INT REFERENCES users (id)
        );
        """,
        """
        DROP TABLE cart
        """,
    ],
    [
        """
        CREATE TABLE cart_listings (
          id SERIAL PRIMARY KEY NOT NULL,
          cart_id INT REFERENCES cart (id) ON DELETE CASCADE,
          listing_id INT REFERENCES listings (id) ON DELETE CASCADE
        );
        """,
        """
        DROP TABLE cart_listings
        """,
    ],
    [
        """
        CREATE TABLE orders (
          id SERIAL PRIMARY KEY NOT NULL,
          user_id INT REFERENCES users (id) NOT NULL,
          shop_id INT REFERENCES shops (id) NOT NULL,
          buyer_first_name VARCHAR(200) NOT NULL,
          buyer_last_name VARCHAR(200) NOT NULL,
          quantity INT NOT NULL,
          listing INT REFERENCES listings (id) NOT NULL,
          status BOOLEAN NOT NULL,
          address TEXT NOT NULL,
          price NUMERIC NOT NULL
        );
        """,
        """
        DROP TABLE orders
        """,
    ],
    [
        """
        CREATE TABLE reviews (
          id SERIAL PRIMARY KEY NOT NULL,
          author VARCHAR(200) REFERENCES users (username) NOT NULL,
          rating INT NOT NULL,
          listing INT REFERENCES listings (id) ON DELETE CASCADE,
          created_on DATE NOT NULL,
          description TEXT NOT NULL
        );
        """,
        """
        DROP TABLE reviews
        """,
    ],
    [
        """
        CREATE TABLE wishlist (
          id SERIAL PRIMARY KEY NOT NULL,
          user_id INT REFERENCES users (id) NOT NULL,
          listings INT[]
        );
        """,
        """
        DROP TABLE wishlist
        """,
    ],
]
