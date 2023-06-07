steps = [
    [
        """
        ALTER TABLE cart
          ADD COLUMN listing_id INT REFERENCES listings (id) NOT NULL,
          ADD COLUMN quantity INT NOT NULL;
        """,
        """
        """
    ],
  ]
