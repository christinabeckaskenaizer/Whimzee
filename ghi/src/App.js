import { useEffect, useState } from "react";
import Landing from "./LandingPage/Landing";
import ErrorNotification from "./ErrorNotification";
import "./App.css";

import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar/NavBar.js";

import UserAccount from "./account-components/UserAccount.js";
import CreateShopForm from "./account-components/CreateShopForm.js";

function App() {
  const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);


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

          <Route path="/shops"></Route>

          <Route path="/liked"></Route>

        <Route path="/checkout"></Route>
      </Routes>
      </div>

    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
