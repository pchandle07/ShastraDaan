import React from 'react';

import PlaceSearchBox from './PlaceSearchBox';
import Menu from './Menu';
import "./Home.css";
import BookDist from "./BookDist.jpg";




const Home = () => {
    return (
        <div>
            <Menu></Menu>
            
            <main className="home-main">

                <div className="MainActions">
                      {/* Right side image will come here */}
                            <div className="left__block">
                                    
                                    <img src={BookDist} alt="img" width="100%"></img>
                            </div>

                                {/* className="heading" */}
                            <div className="right__block">
                            
                                <h2>  Donate For Your School</h2>

                            <PlaceSearchBox />
                            
                            </div>
                           

                </div>
            
            
        
            </main>
        </div>
    );
};

export default Home;