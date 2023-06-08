import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "../custom-hooks/useUser";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AddToCart({
  listing_id,
  setCartListings,
  cartListings,
  detail,
}) {
  const { token } = useToken();
  const { ids } = useUser(token);
  const [alreadyInCart, setAlreadyInCart] = useState(false);

  const checkCartHasListing = () => {
    console.log("this is the cartListing after add", cartListings);
    const filtered = cartListings.filter(
      (listing) => listing_id === listing.listing.id
    );
    console.log("this is the filtered example");
    setAlreadyInCart(filtered);
  };

  const handleClick = async (cart_id, listing_id) => {
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/cart_listings`;
    const data = {
      cart_id: cart_id,
      listing_id: listing_id,
    };
    const config = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, config);
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData, "this is the response after create");
      const newCartListing = {
        id: responseData.id,
        listing: detail,
        num_in_cart: 1,
      };
      setCartListings(cartListings.concat([newCartListing]));
    } else {
      console.log("unable to create");
    }
  };

  useEffect(() => {
    if (cartListings) {
      checkCartHasListing();
      console.log("updated cartListings", cartListings);
    }
  }, [cartListings]);

  if (!ids || !listing_id) {
    return (
      <>
        <Link
          to="/login"
          className="w-full block text-center px-4 py-2 font-bold text-white lg:w-96 bg-green-800 hover:bg-green-900"
        >
          Log in
        </Link>
      </>
    );
  }

  return (
    <>
      {alreadyInCart ? (
        <Link
          to="/checkout"
          className="w-full block text-center px-4 py-2 font-bold text-white lg:w-96 bg-green-800 hover:bg-green-900"
        >
          Proceed to checkout
        </Link>
      ) : (
        <button
          className="w-full px-4 py-2 font-bold text-white bg-green-800 lg:w-96 hover:bg-green-900"
          onClick={() => handleClick(ids.cart_id, listing_id)}
        >
          Add to cart
        </button>
      )}
    </>
  );
}
