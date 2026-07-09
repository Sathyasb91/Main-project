import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./login.css"
import NavbarLogin from "./navbar-login";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async () => {
    try{
    const result = await axios
      .post("http://127.0.0.1:3000/login", { email, password })
      console.log("Full login response:", result.data);

        if (result.status === 200 && result.data?.id) {

          localStorage.setItem("userId",result.data.id);
                navigate(location.state?.from || "/buyer");
    } else {
      alert(result.data?.msg || "Login Failed.");
    }
  } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.msg || "Server error. Please try again later.");
    }
};
  return (
    <div>

    <NavbarLogin />
    <div className="login-cont">
      <div className="login-sub">
        <h1 className="login-heading">LOGIN</h1>
        <div className="login-inputs-cont">
        <input
          type="email"
          className="login-input"
          placeholder="Enter your Email ID"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Enter your Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        </div>
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
        <div className="cont-new-user">
        <p className="new-user">Don't have an Account ?</p>
       <Link to="/signup" className="profile-style">Sign up</Link>
        </div>
      </div>
    </div>
    </div>
  );
}

