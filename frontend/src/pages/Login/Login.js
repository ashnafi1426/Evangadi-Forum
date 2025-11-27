import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../axiosConfig";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const emailValue = emailDom.current.value;
    const passValue = passwordDom.current.value;

    if (!emailValue || !passValue) {
      setError("Please provide all information");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosInstance.post("/users/login", {
        email: emailValue,
        password: passValue,
      });

      localStorage.setItem("token", data.token);
      navigate("/"); // redirect to home
    } catch (error) {
      setError(error?.response?.data?.msg || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login to Your Account</h2>
        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>

        <form onSubmit={handleSubmit}>
          <input
            ref={emailDom}
            type="email"
            name="email"
            placeholder="Email*"
          />
          <input
            ref={passwordDom}
            type="password"
            name="password"
            placeholder="Password*"
          />
          {error && <p className="error">{error}</p>}
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
