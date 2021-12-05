import React, { useEffect, useState } from "react";

import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom";

import Menu from "./Menu";
import PlaceSearchBox from "./PlaceSearchBox";
import { getSchoolInfo } from "./service";

// ChIJh_qPCJK_wjsRyGC2kJtmSdE
const google = window.google;
const pyrmont = new google.maps.LatLng(7.798, 68.14712);

const School = ({
  httpClient,
  setPlaceAddress,
  setPlaceImage,
  setPlaceName,
  placeImage,
  placeName,
  placeAddress,
  setSchoolInfo,
}) => {
  const { placeid } = useParams();
  const navigate = useNavigate();
  const { get, post, response, loading, error } = httpClient;

  useEffect(() => {
    fetchSchoolDetails(placeid);
  }, [placeid]);


  function fetchSchoolDetails(placeid) {
    const request = {
      placeId: placeid,
    };

    const map = new google.maps.Map(document.getElementById("map"), {
      center: pyrmont,
      zoom: 15,
    });
    const service = new google.maps.places.PlacesService(map);

    service.getDetails(request, (place, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        if (place.photos) setPlaceImage(place.photos[0].getUrl());
        setPlaceAddress(place.formatted_address);
        setPlaceName(place.name);
      }
    });
  }

  const handleGoToFundraiserPage = async () => {
    if (placeAddress && placeName && placeid) {
        const schoolInfo = await getSchoolInfo(
          { post, response },
          placeid,
          placeName,
          placeAddress
        );
        setSchoolInfo(schoolInfo)
        navigate("/fundraiser");
    }
  }

  return (
    <div>
      <div id="map"></div>
      <Menu />
      <main className="home-main">
        <div className="heading">Donate for your school</div>
        <PlaceSearchBox />

        {placeImage && (
          <img src={placeImage} className="school-image" alt="school"></img>
        )}

        <div style={{ fontSize: "1.5rem", margin: "1rem" }}>{placeName}</div>
        <div style={{ color: "gray", fontSize: "1.1rem" }}>{placeAddress}</div>
        <button
          disabled={!(placeAddress && placeName && placeid)}
          onClick={handleGoToFundraiserPage}
        >
          {" "}
          Contribute now{" "}
        </button>
      </main>
    </div>
  );
};

export default School;
