// import { useEffect } from "react";
import { Link } from "react-router-dom";
import ReturnToHome from "../utilities/ReturnToHome";
import CartListingCard from "./CartListingCard";

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
      <div className="p-4 m-auto grid grid-cols-1 md:grid-cols-5 w-full md:w-[55rem]">
        <CartListingCard cartListings={cartListings} />
        <div className="flex sticky top-10 w-full m-auto col-span-2 bg-white mt-6">
          <div class="mx-auto rounded-lg ring-1 ring-gray-200 lg:mx-0 lg:flex lg:max-w-none">
            <div class="p-8 sm:p-10 lg:flex-auto">
              <h3 class="text-2xl font-bold tracking-tight text-gray-900">
                Cart Summary Here
              </h3>
              <p class="mt-6 text-base leading-7 text-gray-600">
                This is where we will have our cart summary
                <br />
                listing
                <br />
                price
                <br />
                total
              </p>
              <Link
                className="border-2 px-6 py-4 flex justify-center md:space-x-6"
                to={"/checkout"}
              >
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
