import React, { useState } from 'react';
import { Grid, Dialog, DialogTitle } from '@material-ui/core';
import PlaceSearchBox from './PlaceSearchBox';
import Menu from './Menu';
import { useNavigate } from "react-router-dom";
import { get } from 'lodash';
import "./Home.css";
import BookDist from "./BookDist.jpg";




const Home = () => {
  const [schools, setSchools] = useState([])
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const [openDialog, toggleDialog] = useState(false);
  const [finalPlace, setFinalPlace] = useState();
    console.log({ finalPlace });

    if (finalPlace && get(finalPlace, 'photos[0]')) {
        localStorage.setItem('placeImageUrl', get(finalPlace, 'photos[0]').getUrl())
      }
    return (
        <div>
            {finalPlace &&
            <Dialog PaperProps={{ style: { borderRadius: '4px' } }} onClose={() => toggleDialog(false)} aria-labelledby="simple-dialog-title" maxWidth="md" open={openDialog}>
            <DialogTitle ><div style={{ fontSize: "1.5rem", margin: "1rem" }}>{finalPlace.name}</div>
            <div style={{ color: "gray", fontSize: "1.1rem" }}>{finalPlace.formatted_address}</div>
            </DialogTitle>
            
            {get(finalPlace, 'photos[0]') &&
            <img src={get(finalPlace, 'photos[0]').getUrl()} className="school-image" alt="school"></img>
            }
            
        <button
        style={{ margin: '20px 50px' }}
        //   disabled={!(placeAddress && placeName && placeid)}
          onClick={() => {
            navigate(`/fundraiser/${finalPlace.place_id}`);
          }}
        >Contribute Now!</button>
           </Dialog>
            }
            <Menu></Menu>

            <main className="home-main">

                <div className="main-wrap">
                    <Grid container spacing={1}>
                        <Grid item sm={6} xs={12}>
                            <img src={BookDist} alt="img" width="100%"></img>

                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <h2 style={{ textAlign: 'center' }}>  Donate For Your School</h2>

                            <PlaceSearchBox toggleDialog={toggleDialog} finalPlace={finalPlace} setFinalPlace={setFinalPlace} schools={schools} city={city} setSchools={setSchools} setCity={setCity}  />
                        </Grid>
                    </Grid>
                    {/* Right side image will come here */}
                    {/* <>
                            <div className="left__block">
                                    
                                    <img src={BookDist} alt="img" width="100%"></img>
                            </div>

                            <div className="right__block">
                            
                                <h2>  Donate For Your School</h2>

                            <PlaceSearchBox />
                            
                            </div>
                           
            </> */}
                </div>



            </main>
        </div>
    );
};

export default Home;