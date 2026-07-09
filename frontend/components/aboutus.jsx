import React from "react";
import "./aboutus.css";

export default function Aboutus() {
  return (
    <div className="about-container">
      <h1>About Us</h1>
      <p className="intro">
        Welcome to GlamGrove, your one-stop destination for the latest trends in
        women's, men's, and kids' fashion. We are passionate about delivering
        high-quality, affordable dresses and fashionwear directly to your
        doorstep.
      </p>

      <h2>Our Mission</h2>
      <p>
        At Glamgrove, our mission is to make fashion accessible to everyone. We
        believe that everyone deserves to look and feel their best without
        compromising on style or budget.
      </p>

      <h2>Customer Commitment</h2>
      <p>
        We pride ourselves on excellent customer service and ensuring that your
        shopping experience is seamless from start to finish. Our team works
        tirelessly to bring the latest fashion trends to your wardrobe with just
        a click.
      </p>

      <h2>Contact Us</h2>
      <p>
        Have questions or feedback? We'd love to hear from you!
        <br />
        <i className="fa-solid fa-envelope"></i> Email: support@glamgrove.com
        <br />
        <i className="fa-solid fa-phone"></i> Phone: +91 77777 88888
      </p>
    </div>
  );
}
