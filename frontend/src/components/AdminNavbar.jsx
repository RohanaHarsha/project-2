import './navbar.css';
import logo from '../img/Logo.jpg';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();


    // Fetch values from localStorage
    const sessionUserId = sessionStorage.getItem("userId");
    const sessionuser_email = sessionStorage.getItem("user_email");
    const sessionuserRole = sessionStorage.getItem('userRole');
    console.log("userroll navbar",sessionuserRole);
    console.log("user_email navbar",sessionuser_email);
    console.log("userId navbar",sessionUserId);
 

  const handleLogout = () => {
    // Clear localStorage to log the user out
    localStorage.removeItem("userId");
    localStorage.removeItem("user_email");
    localStorage.removeItem("userRole");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("user_email");
    sessionStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <div>
      <header className='topnav'>
        <img className='logo' src={logo} alt="Daffodil Zone Logo" />
        <nav>
          <ul className='nav__links'>
            <li className='DaffodilZone'>DAFFODIL ZONE</li>
          </ul>
        </nav>

        
        {sessionUserId && sessionuser_email ? (
          <button onClick={handleLogout}>LogOut</button>
        ) : (
          <Link to="/login"><button>LogIn</button></Link>
        )}

      </header>
      <div className='navbar'>
        <nav>
          <ul className='nav__links'>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/displayHouses/Luxury House">Luxury House</Link></li>
            <li><Link to="/displayHouses/Budget House">Budget House</Link></li>
            <li><Link to="/displayHouses/Apartment">Apartment</Link></li>
            <li><Link to="/about">About</Link></li>
            <li>
            {sessionuserRole === "customer" && (
              <li><Link to="/my-bookings">My Bookings</Link></li>
            )}
            </li>
            {sessionuserRole === "agent" && (
              <>
                <li><Link to="/bannerAdd">Add Bannerrrr</Link></li>
                <li><Link to="/addHouseForAdmin">Add House</Link></li>
              </>
            )}
            {sessionuserRole === "user" && (
              <>
                <li><Link to="/displayAgentHouse">Agent Houses</Link></li>
                <li><Link to="/bannerAdd">Add banner</Link></li>
                <li><Link to="/addHouse">Add house</Link></li>
                <li><Link to="/addHotel">Add Hotel</Link></li>
                <li><Link to="/addAgent">Add Agent</Link></li>
                <li><Link to="/bookings">Bookings</Link></li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
}

