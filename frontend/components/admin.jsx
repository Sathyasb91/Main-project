import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./admin.css";
import NavbarSignup from "./navbar-signup";

export default function Admin(){
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");
    const navigate = useNavigate();

    //useEffect(() => {
    //const isAdminLoggedIn = localStorage.getItem("admin")
    //if(isAdminLoggedIn==="true"){
    //    navigate("/dashboard");
    //}
    //},[navigate]);
    //
    const handleLogin=()=>{
            if(email==="admin" && password==="admin123"){
                alert("Login Successfully")
                 localStorage.setItem("admin" ,"adminLogin ")
                navigate("/dashboard");
            }else {
              alert("Incorrect Email or Password")
            }     
    };
    return(
        <div>
        <NavbarSignup />
        <div className="admin-container">
         <div className="admin-sub">
            <h1 className="admin-heading">Admin Login</h1>
            <input type="email" className="admin-input" placeholder="Enter your Email ID" onChange={(e) => setEmail(e.target.value)} />
            <input type="password" className="admin-input" placeholder="Enter your Password" onChange={(e) =>setPassword(e.target.value)} />
            <button className="admin-btn" onClick={handleLogin}>Login</button>
        </div>
        </div>
        </div>
    )
};

