import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-section">
        <img src="/evangadi-logo.png" alt="Evangadi" className="footer-logo" />
        <div className="socials">
          <i className="fab fa-facebook-f"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-youtube"></i>
        </div>
      </div>

      <div className="footer-section">
        <h4>Useful Link</h4>
        <p>How it works</p>
        <p>Terms of Service</p>
        <p>Privacy Policy</p>
      </div>

      <div className="footer-section">
        <h4>Contact Info</h4>
        <p>Evangadi Networks</p>
        <p>support@evangadi.com</p>
        <p>+1-202-386-2702</p>
      </div>
    </footer>
  );
}

export default Footer;
