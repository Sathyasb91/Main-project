import { useEffect, useState } from "react";
import axios from "axios";
import NavbarWishlist from "./navbar-wishlist";
import { useNavigate } from "react-router-dom";
import "./wishlist.css";

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedId = localStorage.getItem("userId");
    if (!storedId) {
      console.warn("User not logged in");
      navigate("/login");
    } else {
      setUserId(storedId);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (!userId) return;

        const response = await axios.post("http://127.0.0.1:3000/wishlist", {
          userId,
        });

        setWishlistItems(response.data);
      } catch (error) {
        console.error("Failed to fetch wishlist:", error);
      }
    };

    fetchWishlist();
  }, [userId]);

  const handleRemove = async (productId) => {
    if (!userId) return;
    try {
      await axios.delete(
        `http://127.0.0.1:3000/removefromwishlist/${userId}/${productId}`,
      );
      setWishlistItems((prev) => prev.filter((item) => item._id !== productId));
      alert("Removed from wishlist");
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      alert("Failed to remove item");
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await axios.post("http://127.0.0.1:3000/addtocart", {
        userId,
        productId,
      });

      alert("Added to cart");

      // Optional: remove from wishlist after adding
      handleRemove(productId);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add to cart");
    }
  };

  return (
    <div>
      <NavbarWishlist />
      <div className="container mt-5">
        <h2 className="mb-4 text-center">Your Wishlist</h2>
        <div className="row">
          {wishlistItems.length === 0 ? (
            <p>No items in wishlist.</p>
          ) : (
            wishlistItems.map((product) => (
              <div className="col-md-4 mb-4" key={product._id}>
                <div className="card h-100 shadow">
                  <img
                    src={`http://127.0.0.1:3000/${product.image}`}
                    className="card-img-top"
                    alt={product.name}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.productname}</h5>
                    <p className="card-text">₹ {product.price}</p>
                    <div className="button-group">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleRemove(product._id)}
                      >
                        Remove
                      </button>

                      <button
                        className="btn btn-success"
                        onClick={() => handleAddToCart(product._id)}
                      >
                        Add to Cart
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
