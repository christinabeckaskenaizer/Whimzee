import React from "react";
import ListingCard from "./ListingCard";
import { useEffect, useState } from "react";

export default function AllListings({ listings }) {
  return (
    <div className="sm:grid flex flex-col items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
      {listings.map((listing) => (
        <div key={listing.id} className="col-span-1">
          <ListingCard
            picture={listing.picture}
            name={listing.name}
            isNew={listing.new}
            price={listing.price}
          />
        </div>
      ))}
    </div>
  );
}
