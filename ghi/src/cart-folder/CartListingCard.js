import { Link } from "react-router-dom";
import Spinner from "../utilities/Spinner";
import DeleteCart from "./DeleteCart";

export default function CartListingCard({ cartListings }) {
  if (!cartListings) {
    return <Spinner />;
  }

  return (
    <div class="mt-4 col-span-3 flex-col flex items-center">
      {cartListings.map((listing) => {
        return (
          <div
            key={listing.id}
            class="p-2 w-[30rem] my-2 full h-52 flex-col-2 flex items-center bg-white border border-gray-200 rounded-lg shadow"
          >
            <img
              class="w-48 h-48 object-cover rounded-lg"
              src="https://www.rei.com/dam/camping-checklist-lg1.jpg?t=ea16by9xs"
              alt=""
            />
            <div className="h-full w-full flex flex-col items-end justify-between text-sm">
              <div className="w-full pl-2">
                <div className="mb-2 flex justify-between text-base font-medium text-gray-900">
                  <h3>
                    <Link to={`/listings/${listing.listing.id}`}>
                      {listing.listing.name}
                    </Link>
                  </h3>
                  <p className="ml-4">${listing.listing.price}</p>
                </div>
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p className="mt-1 text-sm text-gray-500">
                    {listing.listing.description.slice(0, 25)}...
                  </p>
                  <div className="text-gray-500 flex items-center">
                    <button className="w-6 h-6 text-sm bg-gray-100 hover:bg-gray-200 rounded-full">
                      -
                    </button>
                    <p className="mx-2">{listing.num_in_cart}</p>
                    <button className="w-6 h-6 text-sm bg-gray-100 hover:bg-gray-200 rounded-full">
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex">
                <DeleteCart listing_id={listing.id} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
