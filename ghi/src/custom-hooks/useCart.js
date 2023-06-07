import { useEffect, useState } from "react";

const useCart = (ids) => {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    const getCart = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/cart_listings/${ids.cart_id}`
      );
      const result = await response.json();
      setCart(result);
    };

    if (ids?.cart_id) {
      getCart();
    }
  }, [ids]);
  return { cart: cart };
};

export default useCart;
