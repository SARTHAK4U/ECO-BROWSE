import React from 'react'
import { Link } from 'react-router-dom';

import Logo from "../assets/icon.png"

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top bg-dark">
            <Link to="/" className="btn btn-dark navbtn">Home</Link>
            <Link to="/my_activity" className="btn btn-dark navbtn">My Activity</Link>
            <Link to="/eco_friendly_websites" className="btn btn-dark navbtn">Eco Friendly Websites</Link>

            <img src={Logo} alt="EcoBrowse Icon" style={{ height: '7vh', marginLeft: 'auto', marginRight: '20px' }}></img>
        </nav>
    );
}

export default Navbar