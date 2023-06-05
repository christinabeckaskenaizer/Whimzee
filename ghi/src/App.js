import { useEffect, useState } from "react";
import Landing from "./LandingPage/Landing";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar/NavBar.js";
import UserAccount from "./account-components/UserAccount.js";
import DeleteListing from "./listing-components/DeleteListing";
import ListingCard from "./listing-components/ListingCard.js";
import AllListings from "./listing-components/AllListings.js";
import ListingDetail from "./listing-components/ListingDetail";

import Shop from "./shop-components/Shop";

import LoginForm from "./LoginForm";
import SignUpForm from "./SignUp";

import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "./custom-hooks/useUser";
import useShop from "./custom-hooks/useShop";
import useCart from "./custom-hooks/useCart";
import CreateListing from "./listing-components/CreateListing";
import CartView from "./cart-folder/CartView";

import Payment from "./payment-components/Payment";

function App() {
  const { token } = useToken();
  const { user, ids } = useUser(token);
  const { shop } = useShop(ids);
  const { cart } = useCart(ids);
  const [listings, setListings] = useState([]);
  const [listingsBySearchBar, setListingsBySearchBar] = useState([]);
  const [searched, setSearched] = useState(false);

  const fetchListingData = async () => {
    try {
      const listingsUrl = "http://localhost:8000/listings";
      const response = await fetch(listingsUrl);
      const data = await response.json();
      setListings(data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchListingData();
  }, []);

  return (
    <BrowserRouter>
      <NavBar
        token={token}
        user={user}
        listings={listings}
        filteredlistings={listingsBySearchBar}
        setfilteredlistings={setListingsBySearchBar}
        setsearched={setSearched}
      />
      <div className="flex flex-col justify-center">
        <Routes>
          <Route
            path="/"
            element={
              <Landing
                listings={listings}
                filteredlistings={listingsBySearchBar}
                searched={searched}
                setsearched={setSearched}
              />
            }
          />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm ids={ids} />} />

          <Route path="/account">
            <Route
              path=""
              element={
                <UserAccount
                  fetchData={fetchListingData}
                  user={user}
                  ids={ids}
                  shop={shop}
                  token={token}
                  listings={listings}
                />
              }
            />
          </Route>
          <Route
            path="/shops/:shopId"
            element={<Shop listings={listings} />}
          ></Route>
          <Route
            path="/listings"
            element={<AllListings listings={listings} />}
          />
          <Route path="/listings/:id" element={<ListingDetail ids={ids} />} />
          <Route path="/listings/category/:id" />
          <Route path="/cart/:userid" element={<CartView id={ids} />} />
          <Route path="/button" element={<DeleteListing />} />
          <Route path="/liked"></Route>
          <Route
            path="/checkout"
            element={<Payment token={token} user={user} />}
          ></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
