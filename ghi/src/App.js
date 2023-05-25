import { useEffect, useState } from "react";
import Landing from "./LandingPage/Landing";
import ErrorNotification from "./ErrorNotification";
import "./App.css";

import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import NavBar from "./NavBar/NavBar.js";
import UserAccount from "./account-components/UserAccount.js";
import CreateShopForm from "./account-components/CreateShopForm.js";
import ListingCard from "./ListingCard.js";
import AllListings from "./AllListings.js";
import Shop from "./shop-components/Shop";

function App() {
  return (
    <AuthProvider baseUrl={process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}>
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/home" element={<Landing />} />

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
    </AuthProvider>
  );
}

export default App;
