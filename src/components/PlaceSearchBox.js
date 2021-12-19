import React from 'react';
import { Link } from "react-router-dom"
import { get, debounce } from 'lodash';
import { useState, useRef, useEffect } from 'react';
import "./PlaceSearchBox.css"
import { CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@material-ui/core';

const google = window.google

var autoComplete;

const PlaceSearchBox = ({ schools, setSchools, city, setCity, toggleDialog, setFinalPlace }) => {

  let autoCompleteRef = useRef(null);


  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
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
      // setLoading(true);
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // setLoading(false);
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

        <div className="city-input form-input-wrap">
          <TextField autofocus fullWidth variant="outlined" type="search" inputRef={autoCompleteRef} label="Find a city" />
        </div>


        <div className="school-input form-input-wrap" >
          {/* <TextField fullWidth variant="outlined" onChange={handleInput} label="Find your school" type="text" value={text} /> */}
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Find your school</InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              value={text}
              // disabled={loading}
              label="Find your school"
              onChange={handleInput}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    // onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}

                    edge="end"
                  >
                    {loading ?
                      <CircularProgress />
                      : null
                    }
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
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
                  setText(school.name);
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
