import { useEffect, useState } from "react";

import ReturnToHome from "../utilities/ReturnToHome";
import PaymentSuccess from "./PaySuccess";

export default function Payment({
  token,
  user,
  cartListings,
  setCartListings,
}) {
  const [purchased, setPurchased] = useState(false);
  const [checkoutList, setCheckoutList] = useState([]);
  const orderUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/orders`;
  const listingUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/listings`;

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
    const response = await fetch(orderUrl, config);
    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      return null;
    }
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
      `${listingUrl}/${currentListing.listing.id}/inventory`,
      config
    );
    if (response.ok) {
    } else {
      console.log("Unable to update listings");
    }
  };

  const handlePay = async () => {
    for (let i = 0; i < checkoutList.length; i++) {
      const currentListing = checkoutList[i];
      const singleListingUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/listings/${currentListing.listing.id}`;
      const listingResponse = await fetch(singleListingUrl);
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
    // update the shopping cart
    // delete all items cart from checkoutList
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
        <PaymentSuccess checkoutList={checkoutList} />
      ) : (
        <button onClick={handlePay}>pay</button>
      )}
    </>
  );
}
