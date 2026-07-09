import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./navbar-wishlist.css";


export default function NavbarWishlist() {

  const navigate = useNavigate();
  return (
    <div className="wishlist-navbar">
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm sticky-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          GlamGrove
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarBuyer"
          aria-controls="navbarBuyer"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarBuyer">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" to="/buyer">
                Home
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu">
                <li>
                    <button className="dropdown-item" onClick={() => navigate("/category/men")}>Men</button>
                  
                </li>
                <li>
                    <button className="dropdown-item" onClick={() => navigate("/category/women")}>Women</button>
                </li>
                 <li>
                    <button className="dropdown-item" onClick={() => navigate("/category/kids")}>Women</button>
                </li>
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                <i className="fa-solid fa-cart-shopping"></i>Cart
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/profile">
                <i className="fa-solid fa-user"></i>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  );
}
