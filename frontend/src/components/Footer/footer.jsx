import React from "react";
import "./footer.css";
// Replace with your actual logo or remove if you don't want an image
import footerLogo from "../../img/Logo.jpg";

// If you'd like icons (Facebook, Twitter, etc.), you can install FontAwesome:
// 1) npm install @fortawesome/fontawesome-free
// 2) import icons in your CSS or link them in your index.html

const Footer = () => {
  return (
    <footer className="footer-wrapper">
      {/* TOP CALL-TO-ACTION (CTA) */}
      <div className="footer-cta">
        <div className="footer-cta-content">
          <h1>Have Any Questions?</h1>
          <p>We’ll help you find the best solution for your needs.</p>
        </div>
        <button className="footer-cta-button">Contact Us Today</button>
      </div>

      {/* MAIN FOOTER CONTENT */}
      <div className="footer-container">
        {/* BRAND + SUBSCRIBE SECTION */}
        <div className="footer-brand">
          <img src={footerLogo} alt="Footer Logo" className="footer-logo" />
          <p className="footer-brand-text">
            Need More Help? Get updates, tutorials, and special deals delivered to your inbox.
          </p>
          <div className="footer-subscribe">
            <input type="text" placeholder="Enter your email" />
            <button>Subscribe</button>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="footer-column">
          <h3>Navigation</h3>
          <ul>
            <li>Home</li>
            <li>Sales</li>
            <li>Rentals</li>
            <li>Land</li>
            <li>Projects</li>
            <li>Ideal Home</li>
          </ul>
        </div>

        {/* ABOUT LINKS */}
        <div className="footer-column">
          <h3>About</h3>
          <ul>
            <li>Help</li>
            <li>Contact Us</li>
            <li>About Us</li>
            <li>Terms &amp; Conditions</li>
            <li>Privacy Policy</li>
            <li>Careers</li>
          </ul>
        </div>

        {/* SOCIAL / CONTACT */}
        <div className="footer-column">
          <h3>Social</h3>
          <ul>
            <li>Facebook</li>
            <li>Instagram</li>
            <li>Twitter</li>
            <li>+94 763535356</li>
            <li>Daffodilzone@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* COPYRIGHT / LEGAL */}
      <div className="footer-legal">
        <p>© 2025 Daffodilzone.lk. All Rights Reserved.</p>
        <p>Designed by IIT</p>
      </div>
    </footer>
  );
};

export default Footer;
