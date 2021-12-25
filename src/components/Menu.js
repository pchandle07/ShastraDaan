import React from 'react';
import '../index.css';
import "./Menu.css";

import logo from "./book-icon.png"
import { Link } from 'react-router-dom';

const Menu = () => {
    return (
        <div>
            
            <nav className="header-main-wrap">
                <div className="main-wrap nav-header">
                    
                    <>

                    <Link to="/"><img src={logo} className="nav-icon" alt="logo"/></Link>
                    <div className="nav-title">
                       <Link to="/">Vidyartha</Link> 
                    </div>
                    </>
                    
                </div>
            </nav>            
        </div>
    );
};

export default Menu;