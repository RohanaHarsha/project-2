import React from "react";
import "./footer.css";
// Replace with your actual logo or remove if you don't want an image
import footerLogo from "../../img/Logo.jpg";

// If you'd like icons (Facebook, Twitter, etc.), you can install FontAwesome:
// 1) npm install @fortawesome/fontawesome-free
// 2) import icons in your CSS or link them in your index.html

const Footer = () => {
  return (
    <div className="footer-wrapper">

      {/* MAIN FOOTER CONTENT */}
      <div className="footer-container">
        {/* BRAND + SUBSCRIBE SECTION */}
        <div className="footer-brand">
          <img src={footerLogo} alt="Footer Logo" className="footer-logo" />
          
        </div>

        {/* NAVIGATION LINKS */}
        <div className="footer-column">
          <h3>Navigation</h3>
          <table>
            <tr>
              <td>Home</td>
              <td>About Us</td>
            </tr>
          </table>
        </div>

        {/* ABOUT LINKS */}
        <div className="footer-column">
          <h3>About</h3>
        </div>

        {/* SOCIAL / CONTACT */}
        <div className="footer-column">
          <h3>Social</h3>
          <table>
            <tr>
              <td>Facebook</td>
              <td>Twitter</td>
              <td>Instagram</td>
            </tr>
          </table>
        </div>
      </div>

      {/* COPYRIGHT / LEGAL */}
      <div className="footer-legal">
        <p>© 2025 Daffodilzone.lk. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
