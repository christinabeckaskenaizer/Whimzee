import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PaymentSuccess({ checkoutList }) {
  const [ordered, setOrdered] = useState([]);

  useEffect(() => {
    if (checkoutList) {
      setOrdered(checkoutList);
    }
  }, [checkoutList]);

  return (
    <>
      <h1>Your order was successful!</h1>
      <Link to="/" reloadDocument>
        Home
      </Link>
      {/* Show reciept here */}
      {ordered.map((listing) => {
        return <div key={listing.item.id}>item</div>;
      })}
    </>
  );
}
