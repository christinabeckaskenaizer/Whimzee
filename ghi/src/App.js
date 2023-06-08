import { useEffect, useState } from "react";
import Landing from "./LandingPage/Landing";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar/NavBar.js";
import UserAccount from "./account-components/UserAccount.js";
import DeleteListing from "./listing-components/DeleteListing";
import AllListings from "./listing-components/AllListings.js";
import ListingDetail from "./listing-components/ListingDetail";

import Shop from "./shop-components/Shop";

import LoginForm from "./LoginForm";
import SignUpForm from "./SignUp";

import useToken from "@galvanize-inc/jwtdown-for-react";
import useUser from "./custom-hooks/useUser";
import useShop from "./custom-hooks/useShop";
import useCart from "./custom-hooks/useCart";
import CartView from "./cart-folder/CartView";

import Payment from "./payment-components/Payment";
import PaySuccess from "./payment-components/success";

function App() {
  const { token } = useToken();
  const { user, ids } = useUser(token);
  const { shop } = useShop(ids);
  const { cart } = useCart(ids);
  const [listings, setListings] = useState([]);
  const [listingsBySearchBar, setListingsBySearchBar] = useState([]);
  const [searched, setSearched] = useState(false);
  const [cartListings, setCartListings] = useState([]);

  const domain = /https:\/\/[^/]+/;
  const basename = process.env.PUBLIC_URL.replace(domain, "");

  const fetchListingData = async () => {
    try {
      const listingsUrl = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/listings`;
      const response = await fetch(listingsUrl);
      const data = await response.json();
      setListings(data.reverse());
    } catch (error) {}
  };

  useEffect(() => {
    fetchListingData();
  }, []);

  useEffect(() => {
    setCartListings(cart);
  }, [cart]);

  return (
    <BrowserRouter basename={basename}>
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
          <Route
            path="/listings/:id"
            element={
              <ListingDetail
                ids={ids}
                token={token}
                cartListings={cartListings}
                setCartListings={setCartListings}
              />
            }
          />
          <Route path="/listings/category/:id" />
          <Route
            path="/cart"
            element={
              <CartView
                ids={ids}
                cartListings={cartListings}
                setCartListings={setCartListings}
              />
            }
          />
          <Route path="/button" element={<DeleteListing />} />
          <Route path="/liked"></Route>
          <Route
            path="/checkout"
            element={
              <Payment
                token={token}
                user={user}
                cartListings={cartListings}
                setCartListings={setCartListings}
              />
            }
          ></Route>
          <Route path="/success" element={<PaySuccess />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
