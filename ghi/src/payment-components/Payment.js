import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

import ReturnToHome from "../utilities/ReturnToHome";
import PaymentSuccess from "./PaySuccess";

export default function Payment({ token, user }) {
  const [purchased, setPurchased] = useState(false);
  // temporary list
  const tempList = [
    {
      item: {
        id: 2,
        shop_id: 2,
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
        id: 3,
        shop_id: 2,
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
        id: 4,
        shop_id: 2,
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
  ];
  const navigate = useNavigate();
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
      console.log("response not ok");
      return null;
    }
  };

  const editListings = async (currentListing) => {
    let data = {
      quantity: currentListing.item.quantity - currentListing.quantity,
      quantity_sold:
        currentListing.item.quantity_sold + currentListing.quantity,
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
      if (currentListing.item.quantity >= currentListing.quantity) {
        const shop = currentListing.item.shop_id;
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
    // update the shopping cart
    setPurchased(true);
  };

  useEffect(() => {
    setCheckoutList(tempList);
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
