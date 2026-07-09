import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./signup.css";
import NavbarSignup from "./navbar-signup";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    gender: "",
    email: "",
    password: "",
    phoneno: "",
    address: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange =(e) =>{
     setFormData({...formData, image: e.target.files[0]});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
     
    const data = new FormData();
    data.append("username", formData.username);
    data.append("gender", formData.gender);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("phoneno", formData.phoneno);
    data.append("address", formData.address);
    data.append("image", formData.image);

    try {
      const response = await axios.post(
        "http://127.0.0.1:3000/users",
        data
      );
      console.log(response.data);
      alert("User details entered successfully");
      navigate("/login");
    } catch (error) {
      console.error("Error adding user details:", error);
    }
  };

  
  return (
    <div>
      <NavbarSignup />
      <div className="register-cont">
        <div className="register-sub">
          <h1 className="register-heading">Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="input-data"
              name="username"
              placeholder="Name"
              onChange={handleChange}
              required
            />{" "}
            <br />
            <select
              name="gender"
              className="input-data"
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>{" "}
            <br />
            <input
              type="text"
              className="input-data"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />{" "}
            <br />
            <input
              type="password"
              className="input-data"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />{" "}
            <br />
            <input
              type="number"
              className="input-data"
              name="phoneno"
              placeholder="Phone no"
              onChange={handleChange}
              required
            />{" "}
            <br />
            <input
              type="text"
              className="input-data"
              name="address"
              placeholder="Address"
              onChange={handleChange}
              required
            />{" "}
            <input
              type="file"
              className="input-data"
              name="image"
              accept="image/*"
              placeholder="Select the image file"
              onChange={handleImageChange}
              required
            />
            <br />
            <button type="submit" className="input-btn">
              Register
            </button>
            <div className="login-opt">
              <p className="login-head">Already having an account? </p>
              <Link to="/login" className="login-style">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
