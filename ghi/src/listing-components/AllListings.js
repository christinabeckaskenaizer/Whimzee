import React from "react";
import ListingCard from "./ListingCard";
import { useState, useEffect } from "react";


export default function AllListings({ listings, category, filteredlistings }) {
    const [filteredListings, setFilteredListings] = useState([])

    useEffect(() => {
        if (listings) {
            const filtered = listings.filter(listing => listing.category === Number(category));
            setFilteredListings(filtered)
        }

    }, [category]);
    console.log("filtered Listing: ", filteredlistings.length)

    if (filteredlistings.length === 0) {
        if (category === null) {
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
            )
        } else {

            return (
                <div className="sm:grid flex flex-col items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                    {filteredListings ? (filteredListings.map((listing) => (
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
    } else {
        return (
            <div className="sm:grid flex flex-col items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                {filteredlistings ? (filteredlistings.map((listing) => (
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
    }

    // if (!listings) {
    //     return <h1>Loading</h1>;
    // }
