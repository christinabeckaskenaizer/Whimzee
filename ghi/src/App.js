import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";

import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar.js";

import UserAccount from "./account-components/UserAccount.js";
import CreateShopForm from "./account-components/CreateShopForm.js";

function App() {
  return (
    <AuthProvider baseUrl={process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}>
      <BrowserRouter>
        <NavBar />
        {/* <div>
          <ErrorNotification error={error} />
          <Construct info={launchInfo} />
        </div> */}
        <Routes>
          <Route path="/home">
            <Route path="home/listing"></Route>
          </Route>

          <Route path="/account">
            <Route path="" element={<UserAccount />} />
            <Route path="shop" element={<CreateShopForm />} />
            <Route path="listing" />
          </Route>

          <Route path="/shops"></Route>

          <Route path="/liked"></Route>

          <Route path="/checkout"></Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
