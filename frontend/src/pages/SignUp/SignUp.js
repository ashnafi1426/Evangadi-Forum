// import React, { useRef } from "react";
// import {useNavigate} from "react-router-dom";
// import "./SignUp.css"; // Optional CSS file
// import axios from "../../axiosConfig"
// import { Link } from "react-router-dom";
// const SignUp = () => {
//   const navigate=useNavigate();
//   const userNameDom=useRef();
// const firstNameDom=useRef();
// const lastNameDom=useRef();
// const emailDom=useRef();
// const passwordDom=useRef();
// async function handleSubmit(e){
//   e.preventDefault();
//   const usernameValue=userNameDom.current.value;
//   const firstValue=firstNameDom.current.value;
//   const emailValue=emailDom.current.value;
//   const passValue=passwordDom.current.value;
//   const lastValue=lastNameDom.current.value;
//   // console.log(userNameDom.current.value)
//   if(!usernameValue||!firstValue||!lastValue||!emailValue||!passValue){
//     alert("please provide all information")
//   }
// try{
//   await axios.post("/users/register",{
//     username:usernameValue,
//     firstname:firstValue,
//     password:passValue,
//     email:emailValue,
//     lastname:lastValue
//   });
//   alert("register successfully please login")
//   navigate("/signIn")
// }catch(err){
//   alert("something went wrong");
//   console.log(err.response)
// }
// };
  
//   return (
//     <div className="signup-container">
//       <h2>Create an Account</h2>
//       <form className="signup-form" onSubmit={handleSubmit}>
//         <input
//           ref={userNameDom}
//           type="text"
//           name="username"
//           placeholder="Username*"/>
//         <input
//           ref={firstNameDom}
//           type="text"
//           name="firstName"
//           placeholder="First Name" />
//         <input
//           ref={lastNameDom}
//           type="text"
//           name="lastName"
//           placeholder="Last Name" />
//         <input
//         ref={emailDom}
//           type="email"
//           name="email"
//           placeholder="Email*"/>
//         <input
//           ref={passwordDom}
//           type="password"
//           name="password"
//           placeholder="Password*"/>
//           <button type="submit">register</button>
//       </form>
//       <Link to={'/Login'}>Login</Link>
//     </div>
//   );
// };
// export default SignUp;
// import React, { useRef, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "../../axiosConfig"; // same as Login
// import "./SignUp"; // reuse Login.css for consistent style
// import SignUp from './SignUp';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../axiosConfig";
import "./Auth.css"; // shared for SignUp and SignIn pages
function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/users/register", formData);
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.msg || "Registration failed");
    }
  };

  return (
    <div className="auth-wrapper">
      {/* LEFT FORM CARD */}
      <div className="auth-card">
        <h3 className="auth-title">Join the network</h3>
        <p className="auth-subtext">
          Already have an account?{" "}
          <span className="auth-link" onClick={() => navigate("/login")}>
            Sign in
          </span>
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="auth-row">
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
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
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

          <label className="auth-terms">
            <input type="checkbox" required /> I agree to the{" "}
            <a href="#">privacy policy</a> and{" "}
            <a href="#">terms of service</a>.
          </label>

          <button type="submit" className="auth-btn">
            Agree and Join
          </button>

          <p className="auth-footer">
            Already have an account?{" "}
            <span className="auth-link" onClick={() => navigate("/login")}>
              Sign in
            </span>
          </p>
        </form>
      </div>

      {/* RIGHT ABOUT SECTION */}
      <div className="auth-about">
        <h4>About</h4>
        <h1>Evangadi Networks</h1>
        <p>
          No matter what stage of life you are in, whether you’re just starting
          elementary school or being promoted to CEO of a Fortune 500 company,
          you have much to offer to those who are trying to follow in your
          footsteps.
        </p>
        <p>
          Whether you are willing to share your knowledge or you are just
          looking to meet mentors of your own, please start by joining the
          network here.
        </p>
        <button className="how-btn">HOW IT WORKS</button>
      </div>
    </div>
  );
}

export default SignUp;



