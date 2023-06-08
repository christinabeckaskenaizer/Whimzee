import { useEffect } from "react";
import ListingCard from "../listing-components/ListingCard";
//import DeleteCart from "./DeleteCart";

export default function CartView({ ids, cartListings, setCartListings }) {
  useEffect(() => {
    console.log(cartListings, "this is inside the current cart");
  }, [cartListings]);

  if (!ids || !cartListings) {
    return (
      <>
        <h1>Loading</h1>
      </>
    );
  }
  return (
    <>
      <h1>This is the cart Page</h1>
      <p>Here we need to list of of the current cart_listings</p>
      <div>
        <button className="bg-gray-400 p-1 rounded">Checkout</button>
      </div>
      <div>
        {cartListings.map((listing) => {
          return (
            <div key={listing.id} className="flex">
              <div className="">
                <ListingCard
                  picture={listing.listing.picture}
                  name={listing.listing.name}
                  isNew={listing.listing.new}
                  price={listing.listing.price}
                  id={listing.listing.id}
                />
              </div>
              <div>
                <div className="flex">
                  <button className="bg-gray-400 p-1 rounded">
                    decrease by 1
                  </button>
                  <p>number in cart: {listing.num_in_cart}</p>
                  <button className="bg-gray-400 p-1 rounded">
                    increate by 1
                  </button>
                </div>
                <button className="bg-gray-400 p-1 rounded mt-3">
                  Delete from cart
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
