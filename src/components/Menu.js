import React from 'react';
import '../index.css';
import "./Menu.css";

import logo from "./icon1.png"

const Menu = () => {
    return (
        <div>
            
            <nav>
                <div className="main-wrap nav-header">
                    {/* Add a route here to navigate to home page */}
                    <>
                    <img src={logo} className="nav-icon" alt="logo"/>
                    <div>Vidyartha</div>
                    </>
                    
                </div>
            </nav>            
        </div>
    );
};

export default Menu;