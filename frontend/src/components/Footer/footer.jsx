// Footer.jsx
import React from "react";
import footerLogo from "../../img/Logo.jpg";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer-wrapper">
      {/* Main Footer */}
      <div className="footer-container">
        {/* Brand */}
        <div className="footer-brand">
          <img src={footerLogo} alt="Logo" className="footer-logo" />
          <p className="footer-brand-text">
            Daffodilzone.lk — Bringing quality and trust to every purchase.
          </p>
          <div className="footer-subscribe">
            <input type="email" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>

        {/* Navigation */}
        <div className="footer-column">
          <h3>Navigation</h3>
          <ul>
            <li >Home</li>
            <li>About Us</li>
            <li>Shop</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Social */}
        <div className="footer-column">
          <h3>Social</h3>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>Instagram</li>
            <li>LinkedIn</li>
          </ul>
        </div>
      </div>

      {/* Legal */}
      <div className="footer-legal">
        © 2025 Daffodilzone.lk. All Rights Reserved.
      </div>
    </footer>
  );
}
