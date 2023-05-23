import { useEffect, useState } from "react";
import Landing from "./LandingPage/Landing";
import ErrorNotification from "./ErrorNotification";
import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar/NavBar.js";

function App() {
  const [launchInfo, setLaunchInfo] = useState([]);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   async function getData() {
  //     let url = `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/api/launch-details`;
  //     console.log("fastapi url: ", url);
  //     let response = await fetch(url);
  //     console.log("------- hello? -------");
  //     let data = await response.json();

  //     if (response.ok) {
  //       console.log("got launch data!");
  //       setLaunchInfo(data.launch_details);
  //     } else {
  //       console.log("drat! something happened");
  //       setError(data.message);
  //     }
  //   }
  //   getData();
  // }, []);

  return (
    <BrowserRouter>
    <NavBar />
      <div className="container">
      <Routes>
        <Route path="/home" element={<Landing />}>

          <Route path="home/listing"></Route>
        </Route>

        <Route path="/account">
          <Route path="account/shop" />
          <Route path="account/listing" />
        </Route>

        <Route path="/shops"></Route>

        <Route path="/liked"></Route>

        <Route path="/checkout"></Route>
      </Routes>
      </div>

    </BrowserRouter>
  );
}

export default App;
