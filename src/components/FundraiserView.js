import React, { useEffect, useState } from "react";
// import '../../node_modules/boots';
import RazorpayPayment from "./RazorpayPayment";
import ProgressBar from "./ProgressBar";
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import { useNavigate } from "react-router-dom";
import { getSchoolInfo } from "./service";
import Menu from "./Menu";
import { Grid, TextField } from "@material-ui/core";
import Footer from "./Footer";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { fa-facebook } from '@fortawesome/free-solid-svg-icons'

const google = window.google;
const pyrmont = new google.maps.LatLng(7.798, 68.14712);

const FundraiserView = ({ httpClient }) => {
  const { get, post, response, loading, error } = httpClient;
  const [name, setName] = useState("");
  const { placeid } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState();
  const [raisedAmount, setRaisedAmount] = useState(0);
  const [requiredAmount, setRequiredAmount] = useState(0);
  const [progress, setProgress] = useState(0);
  const [placeImageUrl, setPlaceImageUrl] = useState(localStorage.getItem('placeImageUrl') || null);
  const [schoolInfo, setSchoolInfo] = useState({
    schoolInfo: {
      name: 'Loading...',
      id: '',
    }
  });
  const [placeInfo, setPlaceInfo] = useState(localStorage.getItem('placeInfo') ? JSON.parse(localStorage.getItem('placeInfo')) : null);
  console.log({ placeid, placeInfo })
  function fetchSchoolDetails(placeid) {
    console.log('in fetchSchoolDetails')
    try {
      const request = {
        placeId: placeid,
      };

      const map = new google.maps.Map(document.getElementById("map"), {
        center: pyrmont,
        zoom: 15,
      });
      const service = new google.maps.places.PlacesService(map);

      service.getDetails(request, (place, status) => {
        console.log({ status });
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          setPlaceInfo(place);
        }

      });
    } catch (error) {
      console.log('fetchSchoolDetails failed', error);
    }
  }

  const getPlaceInfo = async (placeInfo) => {
    const placeAddress = _.get(placeInfo, 'formatted_address') || '';
    const placeName = _.get(placeInfo, 'name');
    const placeImage = _.get(placeInfo, 'photos[0]') && _.get(placeInfo, 'photos[0]').getUrl && _.get(placeInfo, 'photos[0]').getUrl();
    try {
      if (placeName && placeid) {
        const schoolInfo = await getSchoolInfo(
          { post, response },
          placeid,
          placeName,
          placeAddress
        );
        setSchoolInfo({ schoolInfo, placeImage })
        setProgress(parseInt(Number(schoolInfo.percentage) * 10));
        setRaisedAmount(parseInt(Number(schoolInfo.collected) / 100));
        setRequiredAmount(parseInt(Number(schoolInfo.required) / 100));
      } else {
        console.log('sry bro', { placeAddress, placeName, placeid });
      }
    } catch (error) {
      console.log('getPlaceInfo Error', error);
    }
  }

  useEffect(() => {
    document.body.style.background = "linear-gradient(rgba(255, 255, 255, .8), rgba(255, 255, 255, .8)), url('/books.png')"
    document.body.style.backgroundRepeat = 'repeat-y';
    document.body.style.backgroundSize = '100vh 100%';
    document.body.style.backgroundPosition = 'left 80px';
    return () => {
      document.body.style.background = "linear-gradient(rgba(255, 255, 255, .1), rgba(255, 255, 255, .1)) url('/books.png')"
      document.body.style.backgroundRepeat = 'repeat-y';
      document.body.style.backgroundSize = '100vh 100%';
      document.body.style.backgroundPosition = 'left 80px';
    }
  }, []);

  useEffect(() => {
    if (!placeInfo && !placeid) {
      navigate('/');
    }
    if (!placeInfo) {
      fetchSchoolDetails(placeid);
    }
    if (placeInfo) {
      console.log('got the placeinfo');
      getPlaceInfo(placeInfo);
    }
  }, [placeInfo, placeid, navigate])




  console.log("School selected: ", schoolInfo);
  return (
    <div >
      <Menu></Menu>
      <div className="private-wrap text-center">
        
        

        <Grid container style={{ marginTop: '30px' }} >
          <Grid item sm={7} xs={12} className="align-center">
          <h1> {schoolInfo.schoolInfo.name}</h1>
            <div className="text-center">
              <img
                src={placeImageUrl || schoolInfo.placeImage}
                alt="Place Image unavailable"
                width="100%"
                // height="500"
              ></img>
            </div>
            <h4>{schoolInfo.schoolInfo.address}</h4>
          </Grid>
          <Grid item sm={5} xs={12} style={{ alignSelf: 'center' }}>
            <div className="text-center donor-info-form" style={{ padding: '20px' }}>
              <div>
                <form>
                  <div className="form-input-wrap">
                  <TextField
                    type="text"
                    fullwidth
                    variant="outlined"
                    value={name}
                    onChange={({ target }) => setName(target.value)}
                    label="Enter name"
                  ></TextField>
                  </div>
                  <div className="form-input-wrap">
                  <TextField
                    type="email"
                    fullwidth
                    variant="outlined"
                    value={email}
                    onChange={({ target }) => setEmail(target.value)}
                    label="Enter email"
                  ></TextField>
                  </div>
                  <div className="form-input-wrap">
                  <TextField
                    type="text"
                    fullwidth
                    variant="outlined"
                    value={amount}
                    onChange={({ target }) => setAmount(target.value)}
                    label="Enter Amount"
                  ></TextField>
                  </div>


                  <div>
                    <span className="sub-text"> Raised &#8377;{raisedAmount} out of &#8377;{requiredAmount} ({progress}%) </span>
                    <ProgressBar percentage={progress} />
                  </div>
                  <RazorpayPayment
                    name={name}
                    email={email}
                    amount={amount}
                    httpClient={httpClient}
                    placeId={schoolInfo.schoolInfo.id}
                  ></RazorpayPayment>
                </form>
              </div>
              {/* <>
            <div className="text-center mt-5">
              <p>Donation</p>
              <div className="progress text-center">
                <div
                  className="progress-bar"
                  role="progressbar"
                  now={schoolInfo.percentage}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <br></br>
            <h3>Subtext Lorem ipsum dolor sit amet</h3>

            <table className="table table-dark mt-4">
              <tbody>
                <tr>
                  <td scope="col">Start date</td>
                  <td scope="col">11 nov</td>
                </tr>
                <tr>
                  <th>Days left</th>
                  <td>06</td>
                </tr>
                <tr>
                  <th>No of Doners</th>
                  <td>72</td>
                </tr>
              </tbody>
            </table>
            <hr></hr>
            <h3>Can't Donate?</h3>
            <p>You can help us by this inititave on social media</p>
            <a href="">
              {" "}
              <i class="fab fa-facebook fa-2x p-2"></i>
            </a>
            <a href="">
              {" "}
              <i class="fab fa-instagram fa-2x p-2"></i>
            </a>
            <a href="">
              {" "}
              <i class="fab fa-whatsapp fa-2x p-2"></i>
            </a>
        </> */}
            </div>
          </Grid>
        </Grid>
      </div>
      {/* <>
      <div className="container text-center">
        <h3>
          Donate Books for{" "}
          <span>
            {" "}
            <h1> {schoolInfo.schoolInfo.name}</h1>
          </span>
        </h3>{" "}
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 text-center">
            <img
              src={schoolInfo.placeImage}
              alt="Image unavailable"
              width="100%"
              height="500"
            ></img>
            <h4>{schoolInfo.schoolInfo.address}</h4>
          </div>

          <div className="col-md-6 text-center">
            <div>
              <form>
                <input
                  type="text"
                  value={name}
                  onChange={({ target }) => setName(target.value)}
                  placeholder="Enter name"
                ></input>
                <input
                  type="email"
                  value={email}
                  onChange={({ target }) => setEmail(target.value)}
                  placeholder="Enter email"
                ></input>
                <input
                  type="text"
                  value={amount}
                  onChange={({ target }) => setAmount(target.value)}
                  placeholder="Enter Amount"
                ></input>
                <RazorpayPayment
                  name={name}
                  email={email}
                  amount={amount}
                  httpClient={httpClient}
                  placeId={schoolInfo.schoolInfo.id}
                ></RazorpayPayment>
              </form>
            </div>
            <div className="text-center mt-5">
              <p>Donation</p>
              <div className="progress text-center">
                <div
                  className="progress-bar"
                  role="progressbar"
                  now={schoolInfo.percentage}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <br></br>
            <h3>Subtext Lorem ipsum dolor sit amet</h3>

            <table className="table table-dark mt-4">
              <tbody>
                <tr>
                  <td scope="col">Start date</td>
                  <td scope="col">11 nov</td>
                </tr>
                <tr>
                  <th>Days left</th>
                  <td>06</td>
                </tr>
                <tr>
                  <th>No of Doners</th>
                  <td>72</td>
                </tr>
              </tbody>
            </table>
            <hr></hr>
            <h3>Can't Donate?</h3>
            <p>You can help us by this inititave on social media</p>
            <a href="">
              {" "}
              <i class="fab fa-facebook fa-2x p-2"></i>
            </a>
            <a href="">
              {" "}
              <i class="fab fa-instagram fa-2x p-2"></i>
            </a>
            <a href="">
              {" "}
              <i class="fab fa-whatsapp fa-2x p-2"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="container-fluid text-center mt-5">
        <div className="row">
          <div className="col-md-6 text-center">
            <form action="">
              <div className="form-group">
                <label for="exampleFormControlTextarea1">
                  About Fundraiser campain
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="5"
                ></textarea>
              </div>
              <div>
                <div className="btn btn-primary">Comment</div>
              </div>
            </form>
          </div>
          <div className="col-md-6 text-center">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th colspan="2">Top Doners</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <i class="fa fa-user"></i>Full name
                  </td>
                  <td>
                    <i class="fa fa-user"></i>Full name
                  </td>
                </tr>
                <tr>
                  <td>
                    <i class="fa fa-user"></i>Full name
                  </td>
                  <td>
                    <i class="fa fa-user"></i>Full name
                  </td>
                </tr>
                <tr>
                  <td>
                    <i class="fa fa-user"></i>Full name
                  </td>
                  <td>
                    <i class="fa fa-user"></i>Full name
                  </td>
                </tr>
                <tr>
                  <td>
                    <i class="fa fa-user"></i>Full name
                  </td>
                  <td>
                    <i class="fa fa-user"></i>Full name
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </> */}
      <div style={{ visibility: 'hidden' }} id="map"></div>
      <Footer />
    </div>
  );
};

export default FundraiserView;
