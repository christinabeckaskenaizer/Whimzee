import { useEffect, useState } from "react";

import ReturnToHome from "../utilities/ReturnToHome";
import PaymentSuccess from "./PaySuccess";

export default function Payment({ token, user }) {
  const [purchased, setPurchased] = useState(false);

  const [checkoutList, setCheckoutList] = useState([]);
  const orderUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/orders`;
  const listingUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/listings`;

  const createNewOrder = async (currentListing) => {
    const data = {
      shop_id: currentListing.item.shop_id,
      buyer_first_name: user.username,
      buyer_last_name: user.username,
      quantity: currentListing.quantity,
      listing: currentListing.item.id,
      address: "some address",
      price: currentListing.item.price,
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
      quantity: (currentListing.item.quantity -= currentListing.quantity),
      quantity_sold: (currentListing.item.quantity_sold +=
        currentListing.quantity),
    };
    const config = {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(
      `${listingUrl}/${currentListing.item.id}/inventory`,
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
      console.log("this is the current Listing in the loop", currentListing);
      if (currentListing.item.quantity >= currentListing.quantity) {
        // const shop = currentListing.item.shop_id;
        const orderStatus = await createNewOrder(currentListing);
        console.log("this is the status of the order creation", orderStatus);
        if (orderStatus) {
          editListings(currentListing);
        } else {
          console.log("could not complete order creation");
        }
      } else {
        console.log("Not enough units in stock");
      }
    }
    // update the shopping cart
    setPurchased(true);
  };

  useEffect(() => {
    setCheckoutList([
      {
        item: {
          id: 1,
          shop_id: 1,
          name: "item1",
          quantity: 10,
          quantity_sold: 0,
          description: "aaa",
          price: 10,
          new: true,
          picture: "",
          category: 1,
        },
        quantity: 4,
      },
      {
        item: {
          id: 1,
          shop_id: 1,
          name: "item2",
          quantity: 25,
          quantity_sold: 0,
          description: "dddddd",
          price: 12,
          new: false,
          picture: "",
          category: 5,
        },
        quantity: 13,
      },
      {
        item: {
          id: 1,
          shop_id: 1,
          name: "item3",
          quantity: 45,
          quantity_sold: 0,
          description: "e",
          price: 100,
          new: true,
          picture: "",
          category: 1,
        },
        quantity: 7,
      },
    ]);
  }, []);

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
