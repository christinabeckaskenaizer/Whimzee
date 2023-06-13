import { Link } from "react-router-dom";

export default function ListingCard({ picture, name, isNew, price, id, wishlist, fetchWL, token, ids, changeWishlist }) {

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const updateWishlist = async (newWishlist) => {
    const url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/wishlist/${ids.id}`

    const data = {
      "user_id": ids.id,
      "listings": newWishlist.listings
    }
    const config = {
      credentials: "include",
      method: 'PUT',
      headers: {
        "Content-Type": "application/json",
        headers: { Authorization: `Bearer ${token}` },
      },
      body: JSON.stringify(data)
    };

    const response = await fetch(url, config);

    const updated = await response.json()
    if (response.ok) {
      changeWishlist(updated);
    } else {
      console.log("ERROR!!")
    }
  }

  const addItem = async () => {
    wishlist.listings.push(id);
    updateWishlist(wishlist);
  }

  return (
    <div className="container flex justify-center mx-4 max max-w-4xl hover:scale-105">
      <div className="w-64 sm:w-80 overflow-hidden m-5 max-w-sm bg-white border rounded-lg shadow dark:white">
        <Link to={`/listings/${id}`}>
          <div className="rounded-t-lg overflow-hidden h-48 object-fill flex items-center justify-center">
            <img
              className="rounded-t-lg object-cover w-full h-full"
              src={picture}
              alt="product"
            />
          </div>
        </Link>
        <Link to={`/listings/${id}`}>
          <h5 className="mx-2 text-lg font-bold tracking-tight text-gray-900 dark:text-gray-950 truncate">
            {name}
          </h5>
          <span className="mx-2 bg-blue-100 text-blue-800 text-xs font-semibold mr-2 p-1 rounded dark:bg-green-200 dark:text-gray-950">
            {isNew ? "New" : "Used"}
          </span>

        </Link>
        <div className="flex items-center justify-between p-2">
          <span className="text-xl font-semibold text-gray-900 dark:text-gray-950">
            {formatter.format(price)}
          </span>
          <button
            onClick={() => addItem()}
            href="#"
            className="text-green-700 font-medium rounded-lg text-sm px-2 py-2 text-center"
          >
            {(wishlist && wishlist.listings && wishlist.listings.includes(id)) ?
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 transition ease-in-out delay-150 fill-green-700 hover: hover:fill-green-700 duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
              :
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 transition ease-in-out delay-150 fill-slate-100 hover hover:fill-green-700 duration-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            }
          </button>
        </div>
      </div>
    </div>
  );
}
