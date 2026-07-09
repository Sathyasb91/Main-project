import React from "react";
import { Link } from "react-router-dom";
import "./navbar-login.css";

export default function NavbarLogin() {
  return (
    <nav className="navbar navbar-light bg-light shadow-sm px-3">
      <Link className="navbar-brand fw-bold" to="/">
        GlamGrove
      </Link>

      <div className="d-flex">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/signup">Sign Up</Link>
      </div>
    </nav>
  );
}