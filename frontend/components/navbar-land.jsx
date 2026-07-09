import React from "react";
import { useNavigate } from "react-router-dom";
import "./navbar-land.css"

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary bg-light shadow sticky-top">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          GlamGrove
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            
          </ul> 
          <button className="nav-btn btn-outline" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="nav-btn" onClick={() => navigate("/signup")}>
            Signup
          </button>
        </div>
      </div>
    </nav>
  );
}
