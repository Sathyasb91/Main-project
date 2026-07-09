import React, { useEffect, useRef, useState } from "react";
import "./products.css";
import NavbarDashboard from "./navbar-dashboard";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Products() {
  const [productid, setProductid] = useState("");
  const [productname, setProductname] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState("");
  const imageInputRef = useRef(null);
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("productid", productid);
    formData.append("productname", productname);
    formData.append("quantity", quantity);
    formData.append("price", price);
    if (image) {
      formData.append("image", image);
    }
    formData.append("category", category);
    try {
      const res = await axios.post("http://127.0.0.1:3000/products", formData);
      console.log(res.data);
      alert("Product entered successfully");
      
      setProductid("");
      setProductname("");
      setQuantity("");
      setPrice("");
      setImage(null);

      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }

    } catch (error) {
      console.log("Error occurred:", error);
      alert("Error saving product");
    }
  };
   const handleViewProd = () => {
    navigate('/productlist');
   };
  
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };


  return (
    <div>
      <NavbarDashboard />
      <div className="product-entry-container">
        <h2>Enter Product Details</h2>
        <form
          className="product-entry-form"
          onSubmit={handleSave}>

          <input
            type="number"
            name="productId"
            placeholder="Product ID"
            value={productid}
            onChange={(e) => setProductid(e.target.value)}
            required
          />
          <input
            type="text"
            name="productName"
            placeholder="Product Name"
            value={productname}
            onChange={(e) => setProductname(e.target.value)}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
           <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        <option value="Women">Women</option>
        <option value="Men">Men</option>
        <option value="Kids">Kids</option>
      </select>
          <br />
          <button type="button" onClick={handleViewProd}>View Existing Products</button>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
}
