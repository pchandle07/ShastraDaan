import React, { useState } from "react";
// import '../../node_modules/boots';
import RazorpayPayment from "./RazorpayPayment";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { fa-facebook } from '@fortawesome/free-solid-svg-icons'

const FundraiserView = ({ httpClient, schoolInfo }) => {
  const { get, post, response, loading, error } = httpClient;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
    
  console.log("School selected: ", schoolInfo);
  return (
    <div>
      <div>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Pinda_Daan_-_Jagannath_Ghat_-_Kolkata_2012-10-15_0701.JPG/1280px-Pinda_Daan_-_Jagannath_Ghat_-_Kolkata_2012-10-15_0701.JPG"
          className="nav-icon"
        ></img>
        Shastra Daan
      </div>
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
    </div>
  );
};

export default FundraiserView;
