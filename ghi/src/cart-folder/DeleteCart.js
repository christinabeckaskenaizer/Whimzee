import { useEffect, useState } from "react";

const DeleteCart = async (listing_id) => {
  const data = { id: id, cart_id: cart_id, listing_id: listing_id };

  const config = {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/cart_listings/${cart_listings_id}`,
    config
  );

  if (response.ok) {
    DeleteCart();
  }
};

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
