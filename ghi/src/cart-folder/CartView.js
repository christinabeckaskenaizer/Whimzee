// import { useEffect } from "react";
import { Link } from "react-router-dom";
import ReturnToHome from "../utilities/ReturnToHome";

export default function CartView({ ids, cartListings }) {
  // props setCartListings is available
  if (!ids || !cartListings) {
    return (
      <>
        <ReturnToHome />
      </>
    );
  }
  return (
    <>
      <div className="flex justify-center ">
        <ul className="mt-4 flex items-center flex-col w-5/6 md:w-[40rem] lg:w-[50rem]">
          <div className="flex justify-end w-full">
            <Link to="/checkout" className="bg-gray-400 flex p-1 rounded">
              Checkout
            </Link>
          </div>
          {cartListings.map((listing) => {
            return (
              <div key={listing.id} className="flex w-full">
                <li className="flex m-auto justify-between items-center w-full border-b-2">
                  <div className="h-28 w-28 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={listing.listing.picture}
                      alt=""
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-col py-6 w-5/6">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <Link to={`/listings/${listing.listing.id}`}>
                            {listing.listing.name}
                          </Link>
                        </h3>
                        <p className="ml-4">${listing.listing.price}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {listing.listing.description.slice(0, 25)}...
                      </p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500 flex items-center ">
                        <button className="w-6 h-6 text-sm bg-gray-100 hover:bg-gray-200 rounded-full">
                          -
                        </button>
                        <p className="mx-2">Amount: {listing.num_in_cart}</p>
                        <button className="w-6 h-6 text-sm bg-gray-100 hover:bg-gray-200 rounded-full">
                          +
                        </button>
                      </div>

                      <div className="flex">
                        <button
                          type="button"
                          className="font-medium text-red-600 hover:text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              </div>
            );
          })}
          <div className="mt-2 flex justify-end w-full">
            <Link to="/checkout" className="bg-gray-400 flex p-1 rounded">
              Checkout
            </Link>
          </div>
        </ul>
      </div>
    </>
  );
}
