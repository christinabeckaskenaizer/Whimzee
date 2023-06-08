import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "../custom-hooks/useUser";
//import { useEffect, useState } from "react";
//import CartView from "./CartView";
export default function DeleteCart(props) {
  const { token } = useToken();
  const { ids } = useUser(token);
  const listing_id = props.listing;

  const handleClick = async (listing_id) => {
    const data = {
      cart_id: cart_id,
      listing_id: listing_id,
    };

    const config = {
      method: "delete",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(
      `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/cart_listings/${listing_id}`,
      config
    );
    const cart_id = ids.cart_id;
    if (response.ok) {
      console.log(data);
      //DeleteCart();
      console.log("item deleted");
    } else {
      console.log("unable to delete");
    }
  };
  if (!ids || !listing_id) {
    return (
      <>
        <button className="w-full px-4 py-2 font-bold text-white bg-green-800 lg:w-96 hover:bg-green-900">
          Delete from cart
        </button>
      </>
    );
  }
  //const cart_id = ids.cart_id;
  //const cart_listings_id = ids.listing_id;

  return (
    <>
      <button
        className="w-full px-4 py-2 font-bold text-white bg-green-800 lg:w-96 hover:bg-green-900"
        onClick={() => handleClick(listing_id)}
      >
        Delete
      </button>
    </>
  );
}
// useEffect(() => {
//     const DeleteCart = async () => {
//       const response = await fetch(
//         `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/cart/${ids.listing_id}`, config
//       );
//       const result = await response.json();
//     if (response.ok) {
//         DeleteCart();
//     }
//     }
//     })
