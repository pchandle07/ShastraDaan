import React, { useState } from "react";
import { useFetch } from "use-http";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import School from "./components/School";
import Home from "./components/Home";
import FundraiserView from "./components/FundraiserView";
import { BASE_API_URL } from "./constants";

const App = () => {
  const httpClient = useFetch(BASE_API_URL);
  const [placeName, setPlaceName] = useState("");
  const [placeImage, setPlaceImage] = useState("");
  const [placeAddress, setPlaceAddress] = useState("");
  const [schoolInfo, setSchoolInfo] = useState(null);

  debugger;
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home httpClient={httpClient} />} />
        <Route
          path="/:placeid"
          element={
            <School
              placeName={placeName}
              placeAddress={placeAddress}
              placeImage={placeImage}
              setPlaceName={setPlaceName}
              setPlaceImage={setPlaceImage}
              setPlaceAddress={setPlaceAddress}
              httpClient={httpClient}
              setSchoolInfo={setSchoolInfo}
            />
          }
        />
        <Route path="/fundraiser" element={<FundraiserView httpClient={httpClient} schoolInfo={{ schoolInfo, placeImage}} />} />
      </Routes>
    </Router>
  );
};

export default App;
