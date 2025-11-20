import React, { useState } from "react";
import "../../components/navbar.css";
import logo from "../../img/Logo.jpg";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const sessionUserId = sessionStorage.getItem("userId");
  const sessionuser_email = sessionStorage.getItem("user_email");
  const sessionuserRole = sessionStorage.getItem("userRole");
  const sessionuserName = sessionStorage.getItem("username");

  const handleLogout = () => {
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

  const handleNavClick = () => setOpen(false);

  return (
    <header className="topnav" role="banner">
      <div className="nav-topbar">
        <div className="nav-left">
          <Link to="/" className="brand" onClick={handleNavClick} aria-label="Daffodil Zone home">
            <img className="logo" src={logo} alt="Daffodil Zone logo" />
            <div className="brand-text">
              <div className="DaffodilZone">Daffodil Zone</div>
            </div>
          </Link>
        </div>

        <button
          className={`hamburger ${open ? "is-open" : ""}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav-main ${open ? "open" : ""}`} role="navigation" aria-label="Main navigation">
          <ul className="nav__links" onClick={handleNavClick}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/displayHouses/Luxury House">Luxury</Link></li>
            <li><Link to="/displayHouses/Budget House">Budget</Link></li>
            <li><Link to="/displayHouses/Apartment">Apartment</Link></li>
            <li><Link to="/about">About</Link></li>

            {sessionuserRole === "customer" && <li><Link to="/my-bookings">My Bookings</Link></li>}

            {sessionuserRole === "agent" && (
              <>
                <li><Link to="/bannerAdd">Add Banner</Link></li>
                <li><Link to="/addHouseForAdmin">Add House</Link></li>
              </>
            )}

            {sessionuserRole === "user" && (
              <>
                <li><Link to="/displayAgentHouse">Agent Houses</Link></li>
                <li><Link to="/bannerAdd">Add Banner</Link></li>
                <li><Link to="/addHouse">Add House</Link></li>
                <li><Link to="/addHotel">Add Hotel</Link></li>
                <li><Link to="/addAgent">Add Agent</Link></li>
                <li><Link to="/bookings">Bookings</Link></li>
              </>
            )}
          </ul>

          <div className="nav-actions" onClick={(e) => e.stopPropagation()}>
            <div className="brand-subtitle-right">Property Solutions</div>

            {sessionUserId && sessionuser_email ? (
              <button className="btn-ghost btn-login" onClick={handleLogout}>Log Out</button>
            ) : (
              <Link to="/login"><button className="btn-primary btn-login">Log In</button></Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
