import React from 'react';

import PlaceSearchBox from './PlaceSearchBox';
import Menu from './Menu';

const Home = () => {
    return (
        <div>
            <Menu></Menu>
            
            <main className="home-main">
                <div className="heading">Donate for your school</div>
                <PlaceSearchBox></PlaceSearchBox>
            </main>
        </div>
    );
};

export default Home;