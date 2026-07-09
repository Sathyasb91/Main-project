import { useEffect, useState, useRef } from "react";
import axios from "axios";
import NavbarBuyer from "./navbar-buyer";
import { useNavigate } from "react-router-dom";
import "./checkout.css";

export default function Checkout() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [isSingleItem, setIsSingleItem] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const hasInitialized = useRef(false);

  useEffect(() => {
    if (hasInitialized.current) return; // block second mount
    hasInitialized.current = true;

    const stored = sessionStorage.getItem("checkoutData");

    if (stored) {
      try {
        const data = JSON.parse(stored);
        sessionStorage.removeItem("checkoutData");
        setIsSingleItem(true);
        setCart(data.items);
        setTotal(data.totalAmount);
      } catch (e) {
        console.error("Failed to parse checkoutData", e);
      }
      return;
    }

    setIsSingleItem(false);
    if (!userId) return;

    axios
      .post("http://127.0.0.1:3000/cart", { userId })
      .then((res) => {
        const cartData = Array.isArray(res.data) ? res.data : [];
        setCart(cartData);
        const sum = cartData.reduce(
          (acc, item) => acc + item.productId.price * item.quantity,
          0,
        );
        setTotal(sum);
      })
      .catch((err) => console.error("Error fetching cart:", err));
  }, []);

  useEffect(() => {
    if (!isSingleItem && cart.length > 0) {
      const sum = cart.reduce(
        (acc, item) => acc + item.productId.price * item.quantity,
        0,
      );
      setTotal(sum);
    }
  }, [cart]);

  const handleChange = (e) =>
    setAddress((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const isAddressValid = () => {
    const { name, phone, address: addr, pincode } = address;
    if (
      !name.trim() ||
      !phone.trim() ||
      !addr.trim() ||
      !pincode.trim()
    ) {
      alert("Please fill in all delivery address fields.");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return false;
    }
    if (!/^\d{6}$/.test(pincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!isAddressValid()) return;

    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (paymentMethod === "online") {
      const confirmed = window.confirm(
        "You will be redirected to the payment gateway to complete your order. Click OK to proceed.",
      );
      if (confirmed) {
        alert(
          "Redirecting to payment gateway...\n\n",
        );
      }
      return;
    }

    // Cash on Delivery
    try {
      if (isSingleItem) {
        const item = cart[0];
        await axios.post("http://127.0.0.1:3000/placeorder", {
          userId,
          address,
          productId: item.productId,
          quantity: item.quantity,
          isSingleItem: true,
          paymentMethod: "cod",
        });
      } else {
        await axios.post("http://127.0.0.1:3000/placeorder", {
          userId,
          address,
          paymentMethod: "cod",
        });
      }
      alert("✅ Order placed successfully! Pay on delivery.");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert(" Failed to place order. Please try again.");
    }
  };

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
    } catch (error) {
      console.error("Failed to update quantity:", error);
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

  return (
    <div>
      <NavbarBuyer />
      <div className="container mt-5">
        <h2 className="text-center mb-4">
          {isSingleItem ? "Buy Now — Checkout" : "Checkout"}
        </h2>

        <div className="checkout-grid">
          {/* ── LEFT: Delivery Address ── */}
          <div className="checkout-card">
            <h4 className="section-title"> Delivery Address</h4>
            <hr />
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                className="form-input"
                value={address.name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="number"
                name="phone"
                placeholder="10-digit mobile number"
                className="form-input"
                value={address.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Address</label>
              <textarea
                name="address"
                placeholder="House no., Street, City, State"
                className="form-input"
                rows={3}
                value={address.address}
                onChange={handleChange}
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  placeholder="6-digit pincode"
                  className="form-input"
                  value={address.pincode}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <div className="checkout-card">
            <div className="order-summary-header">
              <h4 className="section-title"> Order Summary</h4>
              {isSingleItem && (
                <span className="badge-single">Single Item</span>
              )}
            </div>
            {/* ── Payment Method ── */}
            <div style={{ margin: "12px 0" }}>
              <p className="payment-method-title">Select Payment Method</p>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <span className="payment-label">
                  <span className="payment-icon">🚚</span>
                  <span>
                    <strong>Cash on Delivery</strong>
                  </span>
                </span>
              </label>

              <label className="payment-option">
                <input
                  type="radio"
                  name="payment"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={() => setPaymentMethod("online")}
                />
                <span className="payment-label">
                  <span className="payment-icon">💳</span>
                  <span>
                    <strong>Online Payment</strong>
                  </span>
                </span>
              </label>
            </div>
            <hr />

            <div className="order-items">
              {cart.length === 0 ? (
                <p>No items found.</p>
              ) : isSingleItem ? (
                // Buy Now — flat item shape
                cart.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <div className="order-item-top">
                      <span className="order-item-name">
                        {item.productname}
                      </span>
                      <span className="order-item-price">
                        ₹ {item.price * item.quantity}
                      </span>
                    </div>
                    <small className="order-item-qty">
                      Qty: {item.quantity}
                    </small>
                  </div>
                ))
              ) : (
                // Full cart — nested item shape
                cart.map((item) => (
                  <div key={item._id} className="order-item">
                    <div className="order-item-top">
                      <span className="order-item-name">
                        {item.productId.productname}
                      </span>
                      <span className="order-item-price">
                        ₹ {item.productId.price * item.quantity}
                      </span>
                    </div>

                    <div className="qty-row">
                      <button
                        className="qty-btn"
                        onClick={() => updateCount(item.productId._id, -1)}
                      >
                        −
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateCount(item.productId._id, 1)}
                      >
                        +
                      </button>
                      <button
                        className="btn-remove-sm"
                        onClick={() => handleRemove(item.productId._id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <hr />

            <div className="price-row total-row">
              <strong>Total Amount</strong>
              <strong>₹ {total}</strong>
            </div>

            <button className="btn-pay" onClick={handlePayment}>
              Pay ₹ {total} Now
            </button>
            <button className="btn-back-cart" onClick={() => navigate("/cart")}>
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
