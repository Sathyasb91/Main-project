import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarBuyer from "./navbar-buyer";
import axios from "axios";
import "./profileedit.css";

export default function ProfileEdit() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    gender: "",
    email: "",
    password: "",
    phoneno: "",
    address: "",
    image: "",
  });

  const id = localStorage.getItem("userId");
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get(`http://127.0.0.1:3000/usersbyid/${id}`).then((result) => {
      setUser(result.data.data);
    });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("gender", user.gender);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("phoneno", user.phoneno);
    formData.append("address", user.address);
    if (image) {
      formData.append("image", image);
    }

    axios
      .put(`http://127.0.0.1:3000/editusers/${user._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Profile Updated");
        console.log("User ID:", user._id);
        navigate("/profile");
      })
      .catch(() => {
        alert("Failed to update profile");
      });
  };

  return (
    <div className="profile-edit-page">
      <NavbarBuyer />
      <div className="profile-cont">
        <div className="profile-card">
          <h3 className="profile-heading">Edit Profile</h3>
          <div className="profile-details"></div>
          <input
            type="text"
            name="username"
            value={user.username || ""}
            onChange={handleChange}
            placeholder={user.username}
          />
          <select value={user.gender} onChange={handleChange} name="gender">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="text"
            name="email"
            value={user.email || ""}
            onChange={handleChange}
            placeholder={user.email}
          />
          <input
            type="text"
            name="password"
            value={user.password || ""}
            onChange={handleChange}
            placeholder={user.password}
          />
          <input
            type="text"
            name="phoneno"
            value={user.phoneno || ""}
            onChange={handleChange}
            placeholder={user.phoneno}
          />
          <input
            type="text"
            name="address"
            value={user.address || ""}
            onChange={handleChange}
            placeholder={user.address}
          />
          <label>Change Profile picture</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={handleSubmit} className="editing">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
