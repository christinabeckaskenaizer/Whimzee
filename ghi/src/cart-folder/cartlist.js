import { useEffect, useState } from "react";

function CartList() {
  const [cart, setCarts] = useState([]);

  const fetchData = async () => {
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/cart_listings/${cart_listings_id}`;
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      setCarts(data.carts);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Carts</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>cart_listings cart_listings_id</th>
            <th>cart_listings cart_id</th>
            <th>cart_listings id</th>
          </tr>
        </thead>
        <tbody>
          {cart_listings.map((cart_listings) => {
            return (
              <tr className="fw-bold" key={cart_listings.id}>
                <td className="fs-3">{cart_listings.cart_listings_id}</td>
                <td className="fs-3">{cart_listings.cart_id}</td>
                <td className="fs-3">{cart_listings.id}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default CartList;
