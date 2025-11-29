import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

const AboutPage = () => {
  const navigate = useNavigate();

  // form data for registration
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.msg || "Registration failed");
      }
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="about-wrapper">
      {/* Left: Sign-up card */}
      <div className="signup-card">
        <h3 className="signup-title">Join the network</h3>
        <p className="signup-subtext">
          Already have an account?{" "}
          <span
            className="signin-link"
            onClick={() => navigate("/login")}
            style={{ color: "blue", cursor: "pointer" }}
          >
            Sign in
          </span>
        </p>

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
            <input type="checkbox" required />
            I agree to the <a href="hgh">privacy policy</a> and{" "}
            <a href="hgh">terms of service</a>.
          </label>

          <button type="submit" className="signup-btn">
            Agree and Join
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

      {/* Right: About section */}
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
        <button
          className="how-btn"
          onClick={() => navigate("/signup")}
        >
          HOW IT WORKS
        </button>
      </div>
    </div>
  );
};

export default AboutPage;
