import { useEffect, useState } from "react";

const useCart = (ids) => {
  const [cart, setCart] = useState([]);

  const getItemsCount = () => {
    return cart.length;
  };
};

const GetCart = async () => {
  const [cartItems, setCartItems] = useState([]);
  const [numItems, setNumItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userId, setUserId] = useState(0);

  // const cartUrl = "http://localhost:8000/cart";
  // // const response = await fetch(cartUrl);
  // const response = await fetch(
  //   `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/cart/user/${ids.cart_id}`,
  //   {
  //     credentials: "include",
  //     headers: {
  //       Authorization: `bearer ${token}`,
  //     },
  //   }
  // );
  // if (response.ok) {
  //   const result = await response.json();

  //   GetCart(result);
  //   console.log(result);
  // }

  useEffect(() => {
    setNumItems(totalPrice, cartItems.length);
  }, []);

  useEffect(() => {
    setTotalPrice(0);
    cartItems.map((item) => {
      if (item.quantity > 0) {
        let newCost = totalPrice + item.quantity * item.price;
        setTotalPrice(newCost);
      }
    });
  }, []);

  const getNumItems = () => {
    return numItems;
  };

  const getTotalCost = () => {
    return totalPrice;
  };

  const getItems = () => {
    return cartItems;
  };

  const addToCart = async (listing_id, quantity) => {
    // add item to cart
    const data = {
      user_id: userId,
      listing_id: listing_id,
      quantity: quantity,
    };
    const config = {
      //credentials: "include",
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        //headers: { Authorization: `Bearer ${token}` },
      },
    };
    const response = await fetch(
      `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/cart/`,
      config
    );
    if (response.ok) {
      refreshCart();
    } else {
      console.log("error in adding to cart");
    }
  };

  const updateQuantity = async (cart_id, listing_id, quantity) => {
    // update quantity
    const data = {
      user_id: userId,
      listing_id: listing_id,
      quantity: quantity,
    };
    const config = {
      //credentials: "include",
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        //headers: { Authorization: `Bearer ${token}` },
      },
    };
    const response = await fetch(
      `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/cart/${cart_id}`,
      config
    );
    if (response.ok) {
      refreshCart();
    } else {
      console.log("error in updating cart");
    }
  };

  const removeItem = async (cart_id) => {
    // remove cart id
    const config = {
      //credentials: "include",
      method: "delete",
      headers: {
        "Content-Type": "application/json",
        //headers: { Authorization: `Bearer ${token}` },
      },
    };
    const response = await fetch(
      `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/cart/${cart_id}`,
      config
    );
    if (response.ok) {
      refreshCart();
    } else {
      console.log("error in adding to cart");
    }
    refreshCart();
  };

  const refreshCart = async (userId) => {
    if (userId > 0) {
      const response = await fetch(
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/cart/user/${userId}`
      );
      if (response.ok) {
        const result = await response.json();
        setCartItems(result);
      }
    } else {
      setCartItems([]);
    }
  };
};

export default GetCart;
