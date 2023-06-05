import { useEffect, useState } from "react";

import ListingCard from "../listing-components/ListingCard";
import Spinner from "../utilities/Spinner";

export default function AccountOrderHistory({ history }) {
  const [purchased, setPurchased] = useState([]);

  const historyToListings = (history) => {
    const listings = [];
    const listingIDs = [];
    for (let i = 0; i < history.length; i++) {
      const listing = history[i].listing;
      const inList = listingIDs.includes(listing.id);
      if (inList === false) {
        listingIDs.push(listing.id);
        listings.push(listing);
      }
    }
    setPurchased(listings);
  };

  useEffect(() => {
    historyToListings(history);
  }, [history]);

  if (!history) {
    return <Spinner />;
  }

  return (
    <>
      <div className="m-auto p-4 flex flex-col px-4">
        {purchased.length > 0 ? (
          <div className="grid m-auto items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {purchased.map((item) => (
              <div key={item.id} className="col-span-1">
                <ListingCard
                  id={item.id}
                  picture={item.picture}
                  name={item.name}
                  isNew={item.new}
                  price={item.price}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl font-medium text-gray-500">
            No orders yet
          </p>
        )}
      </div>
    </>
  );
}
