import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarDashboard from "./navbar-dashboard";
import "./productlist.css"

export default function ViewProduct() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:3000/productlist")
      .then((response) => {
        setProducts(response.data);
        console.log("Products listed are:", response.data);
      })
      .catch((err) => {
        console.log("Error fetching products:", err);
      });
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Do you want to delete this product");
    if (confirmDelete) {
      try {
        await axios.delete(`http://127.0.0.1:3000/deleteproduct/${id}`);
        alert("Product deleted successfully");
        setProducts(products.filter((product) => product._id != id));
      } catch (err) {
        alert("Error deleting product");
        console.error(err);
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/editproduct/${id}`);
  };

  return (
    <>
    <NavbarDashboard />
    <div className="viewproduct-container">
    
    <h2 className="viewproduct-title">Products Listed</h2>
    <table className="viewproduct-table">
      <thead className="viewproduct-thead">
        <tr className="viewproduct-header-row">
          <th className="viewproduct-header">Product ID</th>
          <th className="viewproduct-header">Name</th>
          <th className="viewproduct-header">Quantity</th>
          <th className="viewproduct-header">Price</th>
          <th className="viewproduct-header">Image</th>
          <th className="viewproduct-header">Category</th>
          <th className="viewproduct-header">Actions</th>
        </tr>
      </thead>
      <tbody className="viewproduct-body">
        {products.map((product) => (
          <tr className="viewproduct-row" key={product._id}>
            <td className="viewproduct-cell">{product.productid}</td>
            <td className="viewproduct-cell">{product.productname}</td>
            <td className="viewproduct-cell">{product.quantity}</td>
            <td className="viewproduct-cell">₹{product.price}</td>
            <td className="viewproduct-cell">
              {product.image ? (
                <img
                  className="viewproduct-img"
                  src={`http://127.0.0.1:3000/${product.image}`}
                  alt="Product"
                />
              ) : (
                "No Image"
              )}
            </td>
            <td className="viewproduct-cell">{product.category}</td>
            <td className="viewproduct-cell">
              <button
                className="viewproduct-btn viewproduct-btn-edit"
                onClick={() => handleEdit(product._id)}
              >
                Edit
              </button>
              <button
                className="viewproduct-btn viewproduct-btn-delete"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  </>
  );
}
