import React from "react";
import "./footer.css"

export default function Footer(){
   
    return(
        <footer className="footer ">
            <div className="footer-section">
                <h4>About</h4>
        <ul>
          <li>About Us</li>
        </ul>
      </div>

      <div className="footer-section">
        <h4>Help</h4>
        <ul>
          <li>Contact us on: <a href="tel:100006633">100006633</a></li>
          <li>Mail us: <a href="mailto:glamgrove@gmail.com">glamgrove@gmail.com</a></li>
        </ul>
      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} GlamGrove. All rights reserved.
            </div>
        </footer>
    )
}