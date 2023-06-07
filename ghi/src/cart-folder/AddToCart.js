import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "../custom-hooks/useUser";

export default function AddToCart({ listing_id }) {
  const { token } = useToken();
  const { user, ids } = useUser(token);

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
      console.log(await response.json());
    } else {
      console.log("unable to create");
    }
  };

  if (!ids || !listing_id) {
    return (
      <>
        <button className="w-full px-4 py-2 font-bold text-white bg-green-800 lg:w-96 hover:bg-green-900">
          Add to cart
        </button>
      </>
    );
  }

  const cart_id = ids.cart_id;

  return (
    <>
      <button
        className="w-full px-4 py-2 font-bold text-white bg-green-800 lg:w-96 hover:bg-green-900"
        onClick={() => handleClick(cart_id, listing_id)}
      >
        Add to cart
      </button>
    </>
  );
}
