import React, { useState } from "react";
import { useFetch } from "use-http";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import School from "./components/School";
import Home from "./components/Home";
import FundraiserView from "./components/FundraiserView";
import { BASE_API_URL } from "./constants";
import NewComp1 from "./components/NewComp1";
import NewComp2 from "./components/NewComp2";
import NewComp3 from "./components/NewComp3";

const App = () => {
  const httpClient = useFetch(BASE_API_URL);
  const [placeName, setPlaceName] = useState("");
  const [placeImage, setPlaceImage] = useState("");
  const [placeAddress, setPlaceAddress] = useState("");
  const [schoolInfo, setSchoolInfo] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home httpClient={httpClient} />} />
        {/* <Route
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
        /> */}
        <Route exact path="/fundraiser/:placeid" element={<FundraiserView httpClient={httpClient} schoolInfo={{ schoolInfo, placeImage }} />} />
        <Route exact path="/new1" element={<NewComp1 />}></Route>
        <Route exact path="/new2" element={<NewComp2 />}></Route>
        <Route exact path="/new3" element={<NewComp3 />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
