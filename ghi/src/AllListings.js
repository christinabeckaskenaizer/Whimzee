import React from "react";
import ListingCard from "./ListingCard";
import { useEffect, useState } from "react";


export default function AllListings() {

    const [listings, setListings] = useState([]);

    const fetchListingData = async () => {
        try {
            const listingsUrl = "http://localhost:8000/listings";
            const response = await fetch(listingsUrl);
            const data = await response.json();
            console.log(data);
            setListings(data);
        } catch (error) {
            console.log("error", error);
        }
    }
    useEffect(() => {
        fetchListingData();
    }, [])

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
    )
}
