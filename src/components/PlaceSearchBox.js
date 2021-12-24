import React from 'react';
import { Link } from "react-router-dom"
import { get, debounce } from 'lodash';
import { useState, useRef, useEffect } from 'react';
import "./PlaceSearchBox.css"
import { CircularProgress, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField  } from '@material-ui/core';
import Autocomplete from "@material-ui/lab/Autocomplete";


const google = window.google

var autoComplete;

const PlaceSearchBox = ({ schools, setSchools, city, setCity, toggleDialog, setFinalPlace }) => {

  let autoCompleteRef = useRef(null);


  const [text, setText] = useState("");

  //Mangesh Work
  const [loading, setLoading] = useState(false);

  // const [schools, setSchools] = useState([])
  const [cardVisibility, setCardVisibility] = useState("none") //visible
  const [latitude, setLatitude] = useState(7.798000);
  const [longitude, setLongitude] = useState(68.14712);

  // const [city, setCity] = useState("");
  //fetchSchools is the list of colleges we derive after api call.

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
          
          setLoading(false);

          for (var i = 0; i < results.length; i++) {

            let place = results[i];
            let placeAddress = place.formatted_address.toUpperCase();

            if (placeAddress.includes(city.toUpperCase())) {
              schoolsArr.push(results[i]);
            }
          }
          setSchools(schoolsArr);
        }
      }
    });
  }
    , 500);

    function selectedValue(event,value){
      schools.map((school) =>{

      
      setFinalPlace(school)
      setText(school.name);
      localStorage.setItem('placeInfo', JSON.stringify(school));
      toggleDialog(true);
      }
      );
        }

  function handleInput(e) {
    
    console.log("The event value received is : ",e.target.value);

    setLoading(true);

    if (e.target.value === "") {
      setSchools([])
      setText(e.target.value);
      //       setCardVisibility("none");
      setLoading(false); 
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
         
         
          {/* <CircularProgress />  So this is working very fine...*/}


  <Autocomplete
      disablePortal
      noOptionsText={'No Options'}
      
      options={schools}
      onChange={(event, value) => selectedValue(event,value)}
      getOptionLabel={(option) => option.name.toString()}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Find your school"
      onChange={handleInput} variant="outlined"
      />}
    />
        </div>
      </div>
    </div>
  );
};


export default PlaceSearchBox;
