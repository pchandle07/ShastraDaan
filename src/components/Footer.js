import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer>
            <nav className="header-main-wrap pd-10">
                <div className="main-wrap nav-header nav-footer">
            <ul>
                <li><Link to="/terms">Terms & Conditions</Link></li>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/returns">Return Policy</Link></li>
            </ul>
                    {/* Add a route here to navigate to home page */}
                    <>
                    {/* <img src={logo} className="nav-icon" alt="logo"/> */}
                    {/* <div className="nav-title">Vidyartha</div> */}
                    </>
                    
                </div>
            </nav>      
        </footer>
    )
}

export default Footer;