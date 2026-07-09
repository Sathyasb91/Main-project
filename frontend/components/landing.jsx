import { Link, useNavigate } from "react-router-dom"
import "./landing.css"
import Navbar from "./navbar-land";
import Footer from "./footer";


export default function Landing() {
  
  const navigate = useNavigate();

  const handleBuyerClick = () => {
  const userId = localStorage.getItem("userId");

  if (userId && userId !== "null" && userId !== "undefined" && userId.trim() !== "") {
    navigate("/buyer");
  } else {
    navigate("/login", { state: { from: "/buyer" } });
  }
};
  
    return(
      <div> 
        <Navbar />
      <div className="landing-container">
        <div className="landing-card">
          <h1 className="landing-title">Welcome to GlamGrove</h1>
          <p className="landing-subtitle">Your one-stop eCommerce destination</p>

          <div className="button-group">
            <button className="btn buyer-btn" onClick={handleBuyerClick}>
              Shop Now
            </button>
            <button className="btn admin-btn" onClick={() => navigate("/admin")}>
              Admin
            </button>
          
          </div>
        </div>
      </div>
      <Footer />
    </div>
    
    )
  }