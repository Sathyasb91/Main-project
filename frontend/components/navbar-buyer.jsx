import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./navbar-buyer.css";

export default function NavbarBuyer() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    if (!userId) return;
    axios
      .post("http://127.0.0.1:3000/cart", { userId })
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        const total = data.reduce((sum, item) => sum + item.quantity, 0);
        setCartCount(total);
      })
      .catch((err) => console.error("Failed to fetch cart count:", err));
  }, [userId]);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    navigate("/");
  };

  return (
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
              <Link className="nav-link" to="/buyer">
                <i className="fa-solid fa-house me-1"></i>
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
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/category/men")}
                  >
                    Men
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/category/women")}
                  >
                    Women
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/category/kids")}
                  >
                    Kids
                  </button>
                </li>
              </ul>
            </li>
          </ul>

          <form className="search-form me-3" role="search">
            <i className="fa-solid fa-magnifying-glass search-icon"></i>
            <input
              className="form-control search-input"
              type="search"
              placeholder="Search dresses"
              aria-label="Search"
            />
          </form>

          <ul className="navbar-nav mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">
                <i className="fa-solid fa-heart"></i>Wishlist
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link cart-nav-link" to="/cart">
                <span className="cart-icon-wrapper">
                  <i className="fa-solid fa-cart-shopping"></i>
                  {cartCount > 0 && (
                    <span className="cart-badge">{cartCount}</span>
                  )}
                </span>
                Cart
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
                <i className="fa-solid fa-user"></i>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => navigate("/profile")}
                  >
                    Profile
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
