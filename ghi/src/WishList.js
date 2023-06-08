import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function WishList({ token, ids }) {

    const [listings, setListings] = useState([]);
    const [wishlist, setWishlist] = useState([]);


    const getListings = async () => {
        try {
            const listingsUrl = `http://localhost:8000/listings`;
            const response = await fetch(listingsUrl);
            const listingsData = await response.json();
            if (response.ok) {
                setListings(listingsData)
            }
        } catch {
            console.log("nohr listings")
        }
    }

    const getWishlist = async () => {
        const wishlistUrl = `http://localhost:8000/wishlist/${ids.id}`;
        const config = {
            credentials: "include",
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                headers: { Authorization: `Bearer ${token}` },
            },
        };
        const response = await fetch(wishlistUrl, config, ids);
        const data = await response.json();
        if (response.ok) {
            setWishlist(data.listings)
        } else {
            console.log("uh ohhhhh")
        }
    }

    const updateWishlist = async (newWishlist) => {
        const url = `http://localhost:8000/wishlist/${ids.id}`

        const data = {
            "user_id": ids.id,
            "listings": newWishlist
        }

        const config = {
            credentials: "include",
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                headers: { Authorization: `Bearer ${token}` },
            },
            body: JSON.stringify(data)
        };

        const response = await fetch(url, config);
        const updated = await response.json()

        if (response.ok) {
            setWishlist(updated.listings);
        } else {
            console.log("ERROR!!")
        }
    }

    const removeItem = async (listing) => {
        const iToBeRemoved = wishlist.indexOf(listing.id);
        wishlist.splice(iToBeRemoved, 1);


        setWishlist(wishlist);
        updateWishlist(wishlist);
    }

    useEffect(() => {
        getListings();
    }, []);

    useEffect(() => {
        if (ids) {
            getWishlist();
        }
    }, [ids]);

    return (
        <div>
            {!token && <h2 className='mt-10 text-center font-bold'>
                Oops! Looks like you're not logged in. Please log in to view your wishlist.
            </h2>}
            {token && wishlist.length >= 1 &&
                <section>
                    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
                        <div className="mx-auto max-w-3xl">
                            <header className="text-left">
                                <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">Wishlist</h1>
                            </header>
                            {listings && wishlist && listings.filter(listing => wishlist.includes(listing.id)).map(listing => (
                                <div className="mt-8" key={listing.id}>
                                    <ul className="space-y-4">
                                        <li className="flex items-center gap-4">
                                            <img
                                                src={listing.picture}
                                                className="h-16 w-16 rounded object-cover"
                                                alt="Product"
                                            />
                                            <div>
                                                <h3 className="text-md text-gray-900">{listing.name}</h3>
                                                <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                                                    <div>
                                                        <dt className="inline text-sm">Price:</dt>
                                                        <dd className="inline ml-1 text-sm">{listing.price}</dd>
                                                    </div>
                                                    <div>
                                                        <dt className="inline text-sm">Quantity left:</dt>
                                                        <dd className="inline ml-1 text-sm">{listing.quantity}</dd>
                                                    </div>
                                                </dl>
                                            </div>
                                            <div className="flex flex-1 items-center justify-end gap-2">
                                                <form>
                                                    <label htmlFor="Line1Qty" className="sr-only">
                                                        Quantity
                                                    </label>
                                                    <button className="text-sm bg-green-700 hover:bg-green-800 text-white font-semibold py-2 px-2 border border-green-700 rounded" >
                                                        Add to cart
                                                    </button>
                                                </form>
                                                <button onClick={() => removeItem(listing)} className="text-sm bg-transparent text-green-700 font-semibold hover:text-red-700 py-2 px-2 border border-green-700 hover:border-red-700 rounded">
                                                    Remove
                                                </button>
                                            </div>
                                        </li>
                                    </ul>
                                    <hr className='mt-4'></hr>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>}
            {token && wishlist.length < 1 && <h1 className='mt-10 text-center text-lg font-bold' >Your wish list is empty! <Link className="text-green-700 hover:underline" to="/">Browse</Link> our items to get started</h1>}
        </div>
    );
}
