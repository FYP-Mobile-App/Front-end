import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/cadmos-logo.jpg";

import "../../App.css";

export default function LandingPage() {
  return (
    <header style={HeaderStyle}>
      <img className="logo" src={logo} alt="Logo" />
      <h1 className="main-title text-center">login / register</h1>
      <div className="buttons text-center">
        <Link to="/login">
          <button className="primary-button">log in</button>
        </Link>
        <Link to="/register">
          <button className="primary-button" id="reg_btn">
            <span>register</span>
          </button>
        </Link>
      </div>
    </header>
  );
}

const HeaderStyle = {
  width: "100%",
  height: "100vh",
};
