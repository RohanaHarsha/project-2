// Footer.jsx
import React from "react";
import footerLogo from "../../img/Logo.jpg";
import "./footer.css";

export default function Footer() {
  return (
    <footer className="footer-wrapper" role="contentinfo">
      <div className="footer-inner">
        <div className="footer-left">
          <img src={footerLogo} alt="Daffodil Zone logo" className="footer-logo" />
          <div className="footer-name">Daffodil Zone</div>
        </div>

        <div className="footer-contact" aria-label="Contact information">
          <a className="contact-line" href="tel:+94717876867">+94 71 787 6867</a>
          <a className="contact-line" href="mailto:daffodilzone@gmail.com">daffodilzone@gmail.com</a>
        </div>

        <div className="footer-social" aria-label="Follow us">
          <a className="social-link" href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M22 12.07C22 6.48 17.52 2 11.93 2S2 6.48 2 12.07C2 17.06 5.66 21.11 10.44 21.95v-6.99H7.9v-2.9h2.54V9.15c0-2.5 1.49-3.88 3.77-3.88 1.09 0 2.23.2 2.23.2v2.45h-1.25c-1.23 0-1.61.77-1.61 1.56v1.88h2.74l-.44 2.9h-2.3v6.99C18.34 21.11 22 17.06 22 12.07z"/></svg>
          </a>

          <a className="social-link" href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm5 6.1A3.9 3.9 0 1 0 15.9 12 3.9 3.9 0 0 0 12 8.1zM18.8 6.2a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2z"/></svg>
          </a>

          <a className="social-link" href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.98h4.51V24H.22zM9.86 8.98h4.33v2.06h.06c.6-1.13 2.07-2.32 4.26-2.32 4.55 0 5.39 2.99 5.39 6.88V24h-4.5v-6.62c0-1.58-.03-3.62-2.21-3.62-2.22 0-2.56 1.73-2.56 3.5V24h-4.51z"/></svg>
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="legal">© {new Date().getFullYear()} Daffodil Zone</div>
      </div>
    </footer>
  );
}
