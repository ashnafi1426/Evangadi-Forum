import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import logo from "../../utility/img/evangadi.png";

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="Evangadi" />
        </div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/how-it-works">How it works</Link>
        </nav>

        <div className="auth-btn">
          {token ? (
            <button onClick={handleLogout} className="logout-btn">LOG OUT</button>
          ) : (
            <button onClick={() => navigate("/login")} className="login-btn">SIGN IN</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
