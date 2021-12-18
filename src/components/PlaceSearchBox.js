import React from 'react';
import { Link } from "react-router-dom"
import { get, debounce } from 'lodash';
import { useState, useRef, useEffect } from 'react';
import "./PlaceSearchBox.css"

const google = window.google

var autoComplete;

const PlaceSearchBox = ({ schools, setSchools, city, setCity, toggleDialog, setFinalPlace }) => {

  let autoCompleteRef = useRef(null);


  const [text, setText] = useState("");
  // const [schools, setSchools] = useState([])
  const [cardVisibility, setCardVisibility] = useState("none") //visible
  const [latitude, setLatitude] = useState(7.798000);
  const [longitude, setLongitude] = useState(68.14712);

  // const [city, setCity] = useState("");

  const fetchSchools = debounce(() => {
    var pyrmont = new google.maps.LatLng(latitude, longitude);

    var map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

    var service = new google.maps.places.PlacesService(map);

    var request = {
      location: pyrmont,
      radius: '500',
      query: text,
      types: ['school']
    };

    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {

        setCardVisibility("block")

        let schoolsArr = []


        if (results.length > 0) {

          for (var i = 0; i < results.length; i++) {

            let place = results[i];

            let placeAddress = place.formatted_address.toUpperCase();

            if (placeAddress.includes(city.toUpperCase())) {
              schoolsArr.push(results[i])
            }
          }
          setSchools(schoolsArr)
        }
      }
    });
  }
    , 500);


  function handleInput(e) {

    if (e.target.value === "") {
      setSchools([])
      setText(e.target.value);
      //       setCardVisibility("none");
    }
    else {
      setText(e.target.value);
      fetchSchools();
    }

  }


  useEffect(() => {

    autoComplete = new window.google.maps.places.Autocomplete(

      autoCompleteRef.current,
      { types: ["(cities)"], componentRestrictions: { country: "in" } }
    );

    // autoComplete.setFields(["address_components", "formatted_address", "name"]);

    autoComplete.addListener("place_changed", () => {
      const place = autoComplete.getPlace();
      setLatitude(place.geometry.location.lat())
      setLongitude(place.geometry.location.lng())
      setCity(place.name)
    }

    );

    setText("");
    setCardVisibility("none");
  }, [])

  return (
    <div>
      <div id="map"></div>

      <div className="input-container">

        <div className="city-input">
          <input type="search" ref={autoCompleteRef} placeholder="Select a city" />
        </div>


        <div className="school-input" >
          <input onChange={handleInput} placeholder="Find your school" type="text" value={text} />

          <div className="schoolCards" style={{ display: cardVisibility }}>
            {/* {
              schools.map((school) =>
                <Link key={school.place_id} to={"/"+school.place_id}><div value="hello" key={new Date().getTime()} className="searchCard" onClick={() => {setCardVisibility("none")}}> {school.name} <div style={{fontSize:"0.8rem", color: "gray" }}>
                {school.formatted_address}
                </div></div> </Link>)
            } */}
            {
              schools.map((school) =>
                <div key={school.place_id} to={"/" + school.place_id}><div value="hello" key={new Date().getTime()} className="searchCard" onClick={() => {
                  setFinalPlace(school);
                  localStorage.setItem('placeInfo', JSON.stringify(school));
                  toggleDialog(true);
                  setCardVisibility("none");
                }}
                > {school.name} <div style={{ fontSize: "0.8rem", color: "gray" }}>
                    {school.formatted_address}
                  </div></div> </div>)
            }
          </div>
        </div>

      </div>
    </div>
  );
};

export default PlaceSearchBox;
