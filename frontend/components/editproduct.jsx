import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import NavbarDashboard from "./navbar-dashboard";

export default function EditProduct(){
    const [productid,setProductid] = useState('');
  const [productname, setProductname] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProd = async() =>{
        const response = await axios.get(`http://127.0.0.1:3000/findprodbyid/${id}`);
        const {productid, productname, quantity, price, category} = response.data;
        setProductid(productid || '');
        setProductname(productname || '');
        setQuantity(quantity || '');
        setPrice(price || '');
        setCategory(category || '');
    }
    fetchProd();
  },[id]);

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
        const updatedProd = {productid, productname, quantity, price,category};
        await axios.put(`http://127.0.0.1:3000/editproduct/${id}`,updatedProd);
        navigate('/productlist');
    }catch(error){
        console.error('Error in product updating:', error);
    }
  }



  return(
    <div> 
     <NavbarDashboard />
    <div className="editprod-cont">
        <h2>Edit Products</h2>
        <form
          className="editprod"
          onSubmit={handleSubmit}>

          <input
            type="number"
            name="productId"
            placeholder={"Product ID"}
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
           <select value={category} onChange={(e) => setCategory(e.target.value)} required>
        <option value="">Select Category</option>
        <option value="Women">Women</option>
        <option value="Men">Men</option>
        <option value="Kids">Kids</option>
        </select>
          <br />
          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
   
}