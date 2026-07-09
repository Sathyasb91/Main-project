import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarBuyer from "./navbar-buyer";
import "./buyer.css";

export default function Category() {
  const [products, setProducts] = useState([]);
  const [cartMap, setCartMap] = useState({});
  const { category } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!category) return;

    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          `http://127.0.0.1:3000/category/${category}`,
        );
        setProducts(res.data);
      } catch (err) {
        console.error("Error whle fecthing products:", err);
      }
    };
    fetchProducts();
  }, [category]);

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
      alert("Please login to add to cart");
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
      <div className="container mt-5">
        <h2 className="text-center mb-4 text-capitalize">
          {category} Collection
        </h2>

        <div className="row">
          {products.length === 0 ? (
            <p className="text-center">No products found</p>
          ) : (
            products.map((product) => (
              <div className="col-md-3 mb-4" key={product._id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={`http://127.0.0.1:3000/${product.image}`}
                    className="card-img-top"
                    alt={product.productname}
                  />
                  <div className="card-body d-flex flex-column text-center">
                    <h6 className="card-title">{product.productname}</h6>
                    <p className="card-text">₹ {product.price}</p>

                    <div className="mt-auto d-flex justify-content-center gap-2">

                      {/* ── Cart control ── */}
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

                      {/* ── Wishlist ── */}
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
          )}
        </div>
      </div>
    </div>
  );
}
