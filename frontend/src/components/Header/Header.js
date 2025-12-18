import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../utility/img/evangadi.png";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    setMenuOpen(false);
  };

  // ✅ SINGLE AUTH BUTTON
  const AuthButton = () => (
    token ? (
      <button onClick={handleLogout}>LOG OUT</button>
    ) : (
      <button
        onClick={() => {
          navigate("/login");
          setMenuOpen(false);
        }}
      >
        SIGN IN
      </button>
    )
  );

  return (
    <header className="header">
      <div className="header-container">

        {/* Logo */}
        <div className="logo">
          <img src={logo} alt="Evangadi" />
        </div>

        {/* Hamburger */}
        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation */}
        <nav className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/how-it-works" onClick={() => setMenuOpen(false)}>
            How it works
          </Link>

          {/* Mobile Auth */}
          <div className="auth-btn mobile-auth">
            <AuthButton />
          </div>
        </nav>

        {/* Desktop Auth */}
        <div className="auth-btn desktop-auth">
          <AuthButton />
        </div>

      </div>
    </header>
  );
};

export default Header;
