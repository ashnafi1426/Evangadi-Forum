// src/pages/SignUp/SignUp.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setServerError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    setLoading(true);

    try {
      await userService.registerUser(formData); // WAIT for promise
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setServerError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="about-wrapper">
      <div className="signup-card">
        <h3 className="signup-title">Join the network</h3>
        {serverError && <p className="error-message">{serverError}</p>}

        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstname"
            placeholder="First name"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastname"
            placeholder="Last name"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <label className="terms-label">
            <input type="checkbox" required /> I agree to the{" "}
            <a href="hgh">privacy policy</a> and <a href="hgh">terms of service</a>.
          </label>

          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Creating account..." : "Agree and Join"}
          </button>

          <p className="signin-footer">
            Already have an account?{" "}
            <span
              className="signin-link"
              onClick={() => navigate("/login")}
              style={{ color: "blue", cursor: "pointer" }}
            >
              Sign in
            </span>
          </p>
        </form>
      </div>

      <div className="about-section">
        <h4 className="about-title">About</h4>
        <h1 className="about-heading">Evangadi Networks</h1>
        <p className="about-text">
          No matter what stage of life you are in, whether you’re just starting
          elementary school or being promoted to CEO of a Fortune 500 company,
          you have much to offer to those who are trying to follow in your
          footsteps.
        </p>
        <p className="about-text">
          Whether you are willing to share your knowledge or you are just
          looking to meet mentors of your own, please start by joining the
          network here.
        </p>
        <button className="how-btn" onClick={() => navigate("/signup")}>
          HOW IT WORKS
        </button>
      </div>
    </div>
  );
};

export default SignUp;
