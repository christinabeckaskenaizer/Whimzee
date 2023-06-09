import { useEffect, useState } from "react";
// import { Fragment, useRef } from "react";
// import { Dialog, Transition } from "@headlessui/react";
import PaySuccess from "./success";
import ReturnToHome from "../utilities/ReturnToHome";

export default function Payment({
  token,
  user,
  cartListings,
  setCartListings,
}) {
  const [purchased, setPurchased] = useState(false);
  const [checkoutList, setCheckoutList] = useState([]);
  const url = process.env.REACT_APP_SAMPLE_SERVICE_API_HOST;

  const createNewOrder = async (currentListing) => {
    const data = {
      shop_id: currentListing.listing.shop_id,
      buyer_first_name: user.username,
      buyer_last_name: user.username,
      quantity: currentListing.num_in_cart,
      listing: currentListing.listing.id,
      address: "some address",
      price: currentListing.listing.price,
    };

    const config = {
      credentials: "include",
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        headers: { Authorization: `Bearer ${token}` },
      },
    };
    const response = await fetch(`${url}/orders`, config);
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      return null;
    }
  };

  const deleteCartListings = async (currentListing) => {
    const config = {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(`${url}/cart_listings/${currentListing.id}`, config);
  };

  const editListings = async (currentListing) => {
    let data = {
      quantity: (currentListing.listing.quantity -= currentListing.num_in_cart),
      quantity_sold: (currentListing.listing.quantity_sold +=
        currentListing.num_in_cart),
    };
    const config = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `${url}/listings/${currentListing.listing.id}/inventory`,
      config
    );
    if (response.ok) {
      deleteCartListings(currentListing);
    } else {
      console.log("Unable to update listings");
    }
  };

  const handlePay = async (e) => {
    for (let i = 0; i < checkoutList.length; i++) {
      const currentListing = checkoutList[i];
      const listingResponse = await fetch(
        `${url}/listings/${currentListing.listing.id}`
      );
      if (listingResponse.ok) {
        const listingData = await listingResponse.json();
        currentListing.listing = listingData;
        if (currentListing.listing.quantity >= currentListing.num_in_cart) {
          const orderStatus = await createNewOrder(currentListing);
          if (orderStatus) {
            editListings(currentListing);
          } else {
            console.log("could not complete order creation");
          }
        } else {
          console.log("Not enough units in stock");
        }
      }
    }
    setCartListings([]);
    setPurchased(true);
  };

  useEffect(() => {
    setCheckoutList(cartListings);
  }, [cartListings]);

  if (!user) {
    return <ReturnToHome />;
  }

  return (
    <>
      {purchased ? (
        <PaySuccess />
      ) : (
        <button
          onClick={handlePay}
          className="bg-white hover:bg-gray-200 text-black font-sm
         hover:text-black py-2 px-2 border border-gray-400
        rounded-lg "
        >
          pay
        </button>
      )}
    </>
  );
}
