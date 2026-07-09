import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import NavbarWishlist from "./navbar-wishlist";
import { useNavigate } from "react-router-dom";
import "./cart.css";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();


   useEffect(() => {
      if (!userId) return;
      axios
        .post("http://127.0.0.1:3000/cart", { userId })
        .then((res) => setCart(Array.isArray(res.data) ? res.data : []))
        .catch((err) => console.error("Failed to fetch cart:", err));
    }, [userId]);

    const updateCount = async (productId, change) => {
    try {
      await axios.post("http://127.0.0.1:3000/updatecount", {
        userId,
        productId,
        qty: change,
      });
      setCart((prev) =>
        prev
          .map((item) =>
            item.productId._id === productId
              ? { ...item, quantity: item.quantity + change }
              : item,
          )
          .filter((item) => item.quantity > 0),
      );
    } catch (error)  {
      console.error("Failed to update quantity:", error.message);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:3000/removefromcart/${userId}/${productId}`,
      );
      setCart((prev) =>
        prev.filter((item) => item.productId._id !== productId),
      );
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  

  const handleBuyNow = (product) => {
    const checkoutData = {
      isSingleItem: true,
      items: [
        {
          productId: product.productId._id,
          productname: product.productId.productname,
          price: product.productId.price,
          image: product.productId.image,
          quantity: product.quantity,
        },
      ],
      totalAmount: product.productId.price * product.quantity,
    };
    sessionStorage.setItem("checkoutData", JSON.stringify(checkoutData));
    const verify = sessionStorage.getItem("checkoutData");
  console.log("Set checkoutData:", verify);
    navigate("/checkout");
  };


  const handleCheckoutAll= () =>{
    sessionStorage.removeItem("checkoutData");
    navigate("/checkout")
    };
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalAmount = cart.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

 
  

  return (
      <div className="cart-page">
        <NavbarWishlist />
  
        <div className="cart-container">
          <h2 className="cart-heading">Your Cart</h2>
  
          {cart.length === 0 ? (
            <div className="cart-empty">
              <p>🛒 Your cart is empty.</p>
              <button className="btn-back" onClick={() => navigate("/buyer")}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="cart-layout">
  
              {/* ── LEFT: Product list ── */}
              <div className="cart-items-section">
                {cart.map((product) => (
                  <div className="cart-card" key={product._id}>
                    <img
                      src={`http://127.0.0.1:3000/${product.productId.image}`}
                      className="cart-img"
                      alt={product.productId.productname}
                    />
  
                    <div className="cart-info">
                      <h5 className="cart-name">{product.productId.productname}</h5>
                      <p className="cart-price">₹ {product.productId.price}</p>
  
                      {/* Quantity */}
                      <div className="qty-row">
                        <button
                          className="qty-btn"
                          onClick={() => updateCount(product.productId._id, -1)}
                        >
                          −
                        </button>
                        <span className="qty-value">{product.quantity}</span>
                        <button
                          className="qty-btn"
                          onClick={() => updateCount(product.productId._id, 1)}
                        >
                          +
                        </button>
                      </div>
  
                      <p className="cart-subtotal">
                        Subtotal:{" "}
                        <strong>
                          ₹ {product.productId.price * product.quantity}
                        </strong>
                      </p>
  
                      {/* Actions */}
                      <div className="cart-actions">
                        <button
                          className="btn-remove"
                          onClick={() => handleRemove(product.productId._id)}
                        >
                          Remove
                        </button>
                        <button
                          className="btn-buynow"
                          onClick={() => handleBuyNow(product)}
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
  
              {/* ── RIGHT: Order summary ── */}
              <div className="cart-summary">
                <h5 className="summary-heading">Order Summary</h5>
                <hr />
  
                <div className="summary-row">
                  <span>Items ({totalItems})</span>
                  <span>₹ {totalAmount}</span>
                </div>
                <div className="summary-row">
                  <span>Delivery</span>
                  <span className="free-tag">FREE</span>
                </div>
  
                <hr />
  
                <div className="summary-row summary-total">
                  <strong>Total</strong>
                  <strong>₹ {totalAmount}</strong>
                </div>
  
                <button className="btn-checkout" onClick={handleCheckoutAll}>
                  Checkout ({totalItems} item{totalItems > 1 ? "s" : ""})
                </button>
  
               
              </div>
  
            </div>
          )}
        </div>
      </div>
    );
  }
  