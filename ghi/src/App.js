import { useEffect, useState } from "react";
import Landing from "./LandingPage/Landing";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar/NavBar.js";
import UserAccount from "./account-components/UserAccount.js";
import CreateShopForm from "./account-components/CreateShopForm.js";
import ListingCard from "./ListingCard.js";
import AllListings from "./AllListings.js";
import Shop from "./shop-components/Shop";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUp";
import useToken from "@galvanize-inc/jwtdown-for-react";

function App() {
  const { token } = useToken();
  useEffect(() => {
    console.log(token);
  }, [token]);

  return (
    <BrowserRouter>
      <NavBar token={token} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />

          <Route path="/account">
            <Route path="" element={<UserAccount />} />
            <Route path="shop" element={<CreateShopForm />} />
            <Route path="listing" />
          </Route>

          <Route path="/shops" element={<Shop />}></Route>

          <Route path="/listings" element={<AllListings />} />

          <Route path="/liked"></Route>

          <Route path="/checkout"></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
