import React from "react";
import ListingCard from "./ListingCard";

export default function AllListings({ listings }) {
    console.log(listings)
    // if (!listings) {
    //     return <h1>Loading</h1>;
    // }
    return (
        <div className="sm:grid flex flex-col items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {listings ? (listings.map((listing) => (
                <div key={listing.id} className="col-span-1">
                    <ListingCard
                        picture={listing.picture}
                        name={listing.name}
                        isNew={listing.new}
                        price={listing.price}
                        id={listing.id}
                    />
                </div>
            ))) : <p>Loading...</p>}
        </div>
    );
}
