import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/Logo.jpg";
import "./sidebar.css";

export default function Sidebar() {
  const navigate = useNavigate();

  const sessionUserId = sessionStorage.getItem("userId");
  const sessionuser_email = sessionStorage.getItem("user_email");
  const sessionuserRole = sessionStorage.getItem("userRole");
  const sessionuserName = sessionStorage.getItem("username");

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login", { replace: true }); // Ensure it redirects properly to login
    window.location.reload(); // Optional: force full reload to reset UI
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className="sidebar-logo" />
        <h3>Daffodil Zone</h3>
      </div>

      <div className="sidebar-user">
        <p>
          Welcome, <strong>{sessionuserName || "Guest"}</strong>
        </p>
      </div>

      <ul className="sidebar-links">
        

        {sessionuserRole === "customer" && (
          <>
            <li>
              <Link to="/">🏠 Home</Link>
            </li>
            <li>
              <Link to="/my-bookings" >📑 My Bookings</Link>
            </li>
          </>
        )}

        {sessionuserRole === "agent" && (
          <>
            <li>
              <Link to="/bannerAdd">➕ Add Banner</Link>
            </li>
            <li>
              <Link to="/addHouseForAdmin">🏠 Add House</Link>
            </li>
          </>
        )}

        {sessionuserRole === "user" && (
          <>
            <li>
              <Link to="/displayAgentHouse">🏘 Agent Houses</Link>
            </li>
            <li>
              <Link to="/bannerAdd">📸 Add Banner</Link>
            </li>
            <li>
              <Link to="/addHouse">🏡 Add House</Link>
            </li>
            <li>
              <Link to="/addHotel">🏨 Add Hotel</Link>
            </li>
            <li>
              <Link to="/addAgent">🧑‍💼 Add Agent</Link>
            </li>
           
          </>
        )}
      </ul>

      <div className="sidebar-footer">
        {sessionUserId && sessionuser_email ? (
          <button onClick={handleLogout}>🚪 Logout</button>
        ) : (
          <Link to="/login">
            <button>🔐 Login</button>
          </Link>
        )}
      </div>
    </div>
  );
}
