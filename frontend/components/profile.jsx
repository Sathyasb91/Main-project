import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarBuyer from "./navbar-buyer";
import "./profile.css";

export default function Profile() {
  const [userprofile, setUserprofile] = useState({});
  const navigate = useNavigate();
  const id = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:3000/usersbyid/${id}`)
      .then((result1) => {
        console.log(result1.data.data);
        console.log("Image path:", result1.data.data.image);
        setUserprofile(result1.data.data);
      })
      .catch((err) => {
        console.error("Error fetching profile:", err);
      });
  }, [id]);

  const handleWishlistClick = () => {
    navigate(`/wishlist/${id}`);
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  const handleEditProfile = () => {
    navigate(`/profileedit/${id}`);
  };

  return (
    <div>
      <NavbarBuyer />
      <div className="profile-container">
        <div className="card profile-card shadow p-4">
          <h3 className="card-title text-center mb-4">Your Profile</h3>
          <div className="profile-pic">
            <img
              src={`http://127.0.0.1:3000/${userprofile.image}`}
              alt="Profile pic"
              className="profile-img"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
          </div>
          <div className="card-body">
            <p>
              <strong>Name:</strong> {userprofile.username}
            </p>
            <p>
              <strong>Gender:</strong> {userprofile.gender}
            </p>
            <p>
              <strong>Email:</strong> {userprofile.email}
            </p>
            <p>
              <strong>Phone No:</strong> {userprofile.phoneno}
            </p>
            <p>
              <strong>Address:</strong> {userprofile.address}
            </p>
          </div>
        </div>
        <div className="profile-options">
          <button className="btn btn-wishlist" onClick={handleWishlistClick}>
            View Wishlist
          </button>
          <button className="btn btn-cart" onClick={handleCartClick}>
            View Cart
          </button>
          <button className="btn btn-edit" onClick={handleEditProfile}>
            Edit Profile
          </button>
          <button className="btn btn-edit" onClick={() => navigate("/orders")}>
            Order History
          </button>
        </div>
      </div>
    </div>
  );
}
