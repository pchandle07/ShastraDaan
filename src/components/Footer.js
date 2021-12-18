import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer style={{ padding: "5rem", marginTop: "30vh" }}>
            Footer:
            <ul>
                <li><Link to="/new1">New Component 1</Link></li>
                <li><Link to="/new2">New Component 2</Link></li>
                <li><Link to="/new3">New Component 3</Link></li>
            </ul>
        </footer>
    )
}

export default Footer;