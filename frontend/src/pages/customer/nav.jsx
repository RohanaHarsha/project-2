import React from 'react';
import '../../components/navbar.css';
import logo from '../../img/Logo.jpg';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();


    // Fetch values from localStorage
    const sessionUserId = sessionStorage.getItem("userId");
    const sessionuser_email = sessionStorage.getItem("user_email");
    const sessionuserRole = sessionStorage.getItem('userRole');
    const sessionuserName = sessionStorage.getItem('username');
    console.log("userroll navbar",sessionuserRole);
    console.log("user_email navbar",sessionuser_email);
    console.log("userId navbar",sessionUserId);
    console.log("username navbar",sessionuserName);
 

  const handleLogout = () => {
    // Clear localStorage to log the user out
    localStorage.removeItem("userId");
    localStorage.removeItem("user_email");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("user_email");
    sessionStorage.removeItem("userRole");
    sessionStorage.removeItem("username");
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
        <div className='contact-login'>
        <div className='contactinfo'>
          <ul>
            <li className='capitalize'>Welcome  {sessionuserName}</li>
          </ul>
        </div>
        <div>
        {sessionUserId && sessionuser_email ? (
          <button onClick={handleLogout}>LogOut</button>
        ) : (
          <Link to="/login"><button>LogIn</button></Link>
        )}
        </div>
        </div>

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
                <li><Link to="/bannerAdd">Add Banner</Link></li>
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
