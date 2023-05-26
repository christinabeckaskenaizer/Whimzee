import { useEffect, useState } from "react";
import Landing from "./LandingPage/Landing";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar/NavBar.js";
import UserAccount from "./account-components/UserAccount.js";

import ListingCard from "./ListingCard.js";
import AllListings from "./AllListings.js";
import ListingDetail from "./ListingDetail";

import Shop from "./shop-components/Shop";

import LoginForm from "./LoginForm";
import SignUpForm from "./SignUp";

import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "./custom-hooks/useUser";
import useShop from "./custom-hooks/useShop";
import useCart from "./custom-hooks/useCart";

function App() {
  const { token } = useToken();
  const { user, ids } = useUser(token);
  const { shop } = useShop(ids);
  const { cart } = useCart(ids);

  const [listings, setListings] = useState([]);

  const fetchListingData = async () => {
    try {
      const listingsUrl = "http://localhost:8000/listings";
      const response = await fetch(listingsUrl);
      const data = await response.json();
      setListings(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    // console.log(token);
  }, [token]);

  useEffect(() => {
    fetchListingData();
  }, []);

  return (
    <BrowserRouter>
      <NavBar token={token} />
      <div className="flex justify-center">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />

          <Route path="/account">
            <Route
              path=""
              element={
                <UserAccount
                  user={user}
                  ids={ids}
                  shop={shop}
                  listings={listings}
                />
              }
            />
            <Route path="listing" />
          </Route>

          <Route
            path="/shops/:shopId"
            element={<Shop listings={listings} />}
          ></Route>

          <Route
            path="/listings"
            element={<AllListings listings={listings} />}
          />
          <Route path="/listings/:id" element={<ListingDetail />} />

          <Route path="/liked"></Route>

          <Route path="/checkout"></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
