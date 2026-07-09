import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Edituser() {
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const [address, setAddress] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:3000/usersbyid/${id}`
        );
        const {
          username = "",
          gender = "",
          email = "",
          password = "",
          phoneno = "",
          address = "",
        } = response.data;
        setUsername(username);
        setGender(gender);
        setEmail(email);
        setPassword(password);
        setPhoneno(phoneno);
        setAddress(address);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = {
        username,
        gender,
        email,
        password,
        phoneno,
        address,
      };
      await axios.put(`http://127.0.0.1:3000/editusers/${id}`, updatedUser);
      navigate("/userslist");
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  return (
    <div>
      <h2>Edit User details</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Phoneno"
          value={phoneno}
          onChange={(e) => setPhoneno(e.target.value)}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
