import React, { useEffect, useState } from "react";
import NavbarSignup from "./navbar-signup";
import "./dashboard.css"
import { useNavigate } from "react-router-dom";


export default function Dashboard(){

    const [product, setProduct] = useState([]);
    const [users,setUsers]=useState([]);
    const navigate = useNavigate();

    useEffect(() => {

    });

    const handleUser =() => {
        navigate("/userslist");
    }

    const handleProduct =() => {
        navigate("/products");
    }

    const handleProductList =() =>{
        navigate("/productlist")
    }

    return(
        <div>
            <NavbarSignup />
        <div className="admin-dash">
           <h1 className="dash-title">Admin Dashboard</h1>
           <div className="dash-cards">
            <div className="dash-card" onClick={handleProduct}>
                <h2>Add new Products</h2>
            </div>
            <div className="dash-card" onClick={handleProductList}>
                <p>Total Products Count:{}</p>
                <h2>All Products</h2>
            </div>
            <div className="dash-card" onClick={handleUser}>
                <p>Total Users Registered:{}</p>
                <h2>View User Details </h2>
           </div>
           </div>
         </div>  
        </div>
    )

}

