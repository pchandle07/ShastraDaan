import React from 'react';
import '../index.css';

import logo from "./icon1.png"

const Menu = () => {
    return (
        <div>
            
            <nav>
                <div className="nav-header">
                    <img src={logo} className="nav-icon" alt="logo"></img>
                    Shastra Daan
                </div>
            </nav>            
        </div>
    );
};

export default Menu;