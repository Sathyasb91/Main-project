import { useEffect, useState } from "react";
import axios from "axios";
import NavbarBuyer from "./navbar-buyer";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.post(
          "http://127.0.0.1:3000/orderhistory",
          { userId }
        );
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [userId]);

  return (
     <div>
          <NavbarBuyer />
    <div className="container mt-5">
      <h2 className="text-center mb-4">Order History</h2>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order) => (
          <div key={order._id} className="card mb-4 p-3">
            <h5>Order ID: {order._id}</h5>
            <p>Date: {new Date(order.createdAt).toLocaleString()}</p>

            <hr />

            {order.items.map((item) => (
              <div key={item._id} className="d-flex justify-content-between">
                <span>{item.productId.productname}</span>
                <span>
                  ₹ {item.productId.price} × {item.quantity}
                </span>
              </div>
            ))}

            <hr />

            <h5>Total: ₹ {order.total}</h5>

            <p>
              <strong>Address:</strong> {order.address.address},{" "}
              {order.address.city} - {order.address.pincode}
            </p>
          </div>
        ))
      )}
    </div>
    </div>
  );
}