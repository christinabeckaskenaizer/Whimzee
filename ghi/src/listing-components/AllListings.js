import React from "react";
import ListingCard from "./ListingCard";
import { useState, useEffect } from "react";

export default function AllListings({
  listings,
  category,
  filteredlistings,
  searched,
  ids,
  token,
  wishlist,
  fetchWL,
  changeWishlist
}) {
  const [filteredListings, setFilteredListings] = useState([]);

  useEffect(() => {
    if (listings) {
      const filtered = listings.filter(
        (listing) => listing.category === Number(category)
      );
      setFilteredListings(filtered);
    }
    // eslint-disable-next-line
  }, [category]);


  if (searched === false) {
    if (category === null) {
      return (
        <>
          <h1 className="text-left font-bold text-lg pl-9">Recently Posted</h1>
          <div className="sm:grid flex flex-col items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
            {listings ? (
              listings.map((listing) => (
                <div key={listing.id} className="col-span-1">
                  <ListingCard
                    changeWishlist={changeWishlist}
                    ids={ids}
                    token={token}
                    fetchWL={fetchWL}
                    wishlist={wishlist}
                    picture={listing.picture}
                    name={listing.name}
                    isNew={listing.new}
                    price={listing.price}
                    id={listing.id}
                  />
                </div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>
        </>
      );
    } else {
      return (
        <div className="sm:grid flex flex-col items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
          {filteredListings ? (
            filteredListings.map((listing) => (
              <div key={listing.id} className="col-span-1">
                <ListingCard
                  picture={listing.picture}
                  name={listing.name}
                  isNew={listing.new}
                  price={listing.price}
                  id={listing.id}
                />
              </div>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      );
    }
  } else if (filteredlistings.length === 0 && searched === true) {
    return (
      <>
        <div>
          <center>
            <img
              alt=""
              src="https://media.istockphoto.com/id/1393523119/vector/cat-wearing-sunglasses-eyeglasses-rainbow-lenses-cute-cartoon-funny-character-kitten-kitty.jpg?s=612x612&w=0&k=20&c=nWY9LoFi3pHsyoEStNnZFNoGfaNk_Ks6vQegDKNFLoI="
              width="400"
              height="500"
            ></img>
          </center>
        </div>
        <div>
          <h1 className="text-2xl">No result - try other terms</h1>
        </div>
      </>
    );
  } else {
    return (
      <div className="sm:grid flex flex-col items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
        {filteredlistings ? (
          filteredlistings.map((listing) => (
            <div key={listing.id} className="col-span-1">
              <ListingCard
                picture={listing.picture}
                name={listing.name}
                isNew={listing.new}
                price={listing.price}
                id={listing.id}
              />
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  }
}
