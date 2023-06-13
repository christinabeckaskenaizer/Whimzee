import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import Checkout from "../payment-components/Checkout";
import ReturnToHome from "../utilities/ReturnToHome";
import CartListingCard from "./CartListingCard";

export default function CartView({ ids, cartListings, setCartListings, user, token }) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotalCost = () => {
      let totalCost = cartListings.reduce(
        (sum, listing) => sum + listing.listing.price * listing.num_in_cart,
        0
      );
      setTotal(totalCost);
    };
    if (cartListings) {
      getTotalCost();
    }
  }, [cartListings]);

  if (!ids || !cartListings) {
    return (
      <>
        <ReturnToHome />
      </>
    );
  }

  return (
    <>
      <div className="p-4 m-auto grid grid-cols-1 md:grid-cols-5 w-full md:w-[55rem]">
        <CartListingCard cartListings={cartListings} />
        <div className="text-gray-600 flex sticky top-10 w-full m-auto col-span-2 bg-white mt-6">
          <div className="w-full mx-auto rounded-lg ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto">
              <h3 className="text-2xl font-bold text-center text-gray-900">
                Cart Summary
              </h3>
              {cartListings.length > 0 ? (
                <div className="mb-5">
                  <p className="mt-6 mb-1 text-base leading-7">
                    Currently in Cart:
                  </p>
                  {cartListings.map((listing) => {
                    return (
                      <div
                        key={listing.id}
                        className="flex justify-between border-b-2"
                      >
                        <p>{listing.listing.name}:</p>
                        <p>${listing.listing.price}</p>
                      </div>
                    );
                  })}
                  <div>
                    <p className="flex font-semibold text-gray-800 justify-end">
                      total: ${total}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-base font-bold text-center text-gray-900">
                  No items in Cart
                </p>
              )}
              {cartListings.length > 0 ? (
                // <Link
                //   className="border-2 px-6 py-4 rounded-lg flex justify-center font-semibold text-gray-50 bg-green-800"
                //   to="/checkout"
                // >
                //   Checkout
                // </Link>
                <Checkout
                  token={token}
                  user={user}
                  cartListings={cartListings}
                  setCartListings={setCartListings}
                />
              ) : (
                <div className="text-gray-400 rounded-lg border-2 px-6 py-4 flex justify-center">
                  Checkout
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
