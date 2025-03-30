import React from "react";
import "./footer.css";
import footerImage from '../../img/Logo.jpg';

const Footer = () => {
  return (
    <>
      <section className="footer-footerContact">
        <div className="footer-container">
          <div className="footer-send footer-flex">
            <div className="footer-text">
              <h1>Do You Have Questions?</h1>
              <p>We'll help you to grow your career and growth.</p>
            </div>
            <button className="footer-btn5">Contact Us Today</button>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-container footer-footer-grid">
          {/* Column for Image */}
          <div className="footer-footer-column footer-logo-column">
            <img className="footer-footerimg" src={footerImage} alt='Logo' />
            <h2>Do You Need Help With Anything?</h2>
            <p>Receive updates, hot deals, tutorials, discounts sent straight to your inbox every month.</p>
            <div className="footer-input footer-flex">
              <input type="text" placeholder="Email Address" />
              <button>Subscribe</button>
            </div>
          </div>

          {/* Column 1 - Navigation */}
          <div className="footer-footer-column">
            <h3>Navigation</h3>
            <ul>
              <li>Home</li>
              <li>Sales</li>
              <li>Rentals</li>
              <li>Land</li>
              <li>Featured Projects</li>
              <li>Ideal Home</li>
              <li>Post your ad</li>
              <li>Wanted</li>
              <li>Find Agent</li>
              <li>Our Services</li>
            </ul>
          </div>

          {/* Column 2 - Features & Tools */}
          <div className="footer-footer-column">
            <h3>About</h3>
            <ul>
              <li>Help</li>
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Terms and Conditions</li>
              <li>Privacy Policy</li>
              <li>Careers</li>
              <li>Events</li>
            </ul>
          </div>

          {/* Column 3 - About */}
          <div className="footer-footer-column">
            <h3>Social</h3>
            <ul>
              <li>Facebook\Daffodilzone</li>
              <li>Instagram</li>
              <li>Twitter</li><br />
              <li>+94763535356</li>
              <li>Daffodilzone@gmail.com</li>
            </ul>
          </div>
        </div>
      </footer>

      <div className="footer-legal">
        <span>© Copyright Daffodilzone.lk, dz.lk 2024 | All Rights Reserved. Designed By IIT .</span>
      </div>
    </>
  );
};

export default Footer;
