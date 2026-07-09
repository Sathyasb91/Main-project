import React, { useEffect, useState } from "react";
import carousel1 from "../components/buyer-carousal.jpg";
import carousel2 from "../components/buy-carousal.jpg";
import NavbarBuyer from "./navbar-buyer";
import Footer from "./footer";
import "./buyer.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Buyer() {
  const [products, setProducts] = useState([]);
  const [cartMap, setCartMap] = useState({});
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/productlist")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setProducts([]);
      });
  }, []);

   useEffect(() => {
    if (!userId) return;
    axios
      .post("http://127.0.0.1:3000/cart", { userId })
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        const map = {};
        data.forEach((item) => {
          map[item.productId._id] = item.quantity;
        });
        setCartMap(map);
      })
      .catch((err) => console.error("Failed to fetch cart:", err));
  }, [userId]);

  const handleAddToCart = async (productId) => {
    if (!userId) {
      alert("User not logged in");
      return;
    }
    try {
      await axios.post("http://127.0.0.1:3000/addtocart", { userId, productId });
      setCartMap((prev) => ({
        ...prev,
        [productId]: (prev[productId] || 0) + 1,
      }));
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    }
  };
   
    const handleDecreaseCart = async (productId) => {
    try {
      await axios.post("http://127.0.0.1:3000/updatecount", {
        userId,
        productId,
        qty: -1,
      });
      setCartMap((prev) => {
        const updated = { ...prev };
        if (updated[productId] <= 1) {
          delete updated[productId];
        } else {
          updated[productId] -= 1;
        }
        return updated;
      });
    } catch (error) {
      console.error("Error decreasing cart:", error);
    }
  };

  const handleAddToWishlist = async (productId) => {
    
    if (!userId) {
      localStorage.setItem("redirectAfterLogin", "/wishlist");
      navigate("/login");
      return;
    }
    try {
      const res = await axios.post("http://127.0.0.1:3000/addtowishlist", {
        userId,
        productId,
      });

      if (res.data.success) {
        alert("Product added to wishlist!");
      } else {
        alert(res.data.msg || "Failed to add to wishlist.");
      }
    } catch (error) {
      console.error("Failed to add to wishlist:", error);
      alert("Something went wrong.");
    }
  };
  return (
    <div>
      <NavbarBuyer />
      <div className="buyer-page">
        <div className="carousel-container">
          <div
            id="carouselExampleAutoplaying"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={carousel1}
                  className="d-block w-100"
                  alt="Fashion 1"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={carousel2}
                  className="d-block w-100"
                  alt="Fashion 2"
                />
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <h2 className="text-center mb-4">Shop the Latest</h2>
        <div className="row">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100 shadow">
                  <img
                    src={`http://127.0.0.1:3000/${product.image}`}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.productname}</h5>
                    <p className="card-text">₹ {product.price}</p>
                    <div className="mt-auto d-flex justify-content-center gap-2">
                       {cartMap[product._id] ? (
                        <div className="cart-qty-control">
                          <button
                            className="qty-ctrl-btn"
                            onClick={() => handleDecreaseCart(product._id)}
                          >
                            −
                          </button>
                          <span className="qty-ctrl-count">
                            {cartMap[product._id]}
                          </span>
                          <button
                            className="qty-ctrl-btn"
                            onClick={() => handleAddToCart(product._id)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn btn-add-cart"
                          onClick={() => handleAddToCart(product._id)}
                        >
                          <i className="fa-solid fa-cart-shopping me-1"></i>
                          Add to Cart
                        </button>
                      )}

                      <button
                        className="btn btn-wishlist"
                        onClick={() => handleAddToWishlist(product._id)}
                      >
                        <i className="fa-solid fa-heart me-1"></i>
                        Wishlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Products will be added</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}