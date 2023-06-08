import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "../custom-hooks/useUser";

export default function DeleteCart({ listing_id }) {
  const { token } = useToken();
  const { ids } = useUser(token);

  const handleClick = async (listing_id) => {
    const data = {
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

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      console.log("item deleted");
    } else {
      console.log("unable to delete");
    }
  };
  if (!ids || !listing_id) {
    return (
      <>
        <button className="font-medium text-red-600 hover:text-red-400">
          Delete from cart
        </button>
      </>
    );
  }

  return (
    <>
      <button
        className="font-medium text-red-600 hover:text-red-400"
        onClick={() => handleClick(listing_id)}
      >
        Delete
      </button>
    </>
  );
}
