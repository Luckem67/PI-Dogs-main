import React from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";

export default function LandingPage() {
  return (
    <div className="landing_page">
      <h1 className="title_landing">¡WOOF WOOF!</h1>
      <h4 className="subtitle_landing">Find and create the breed of dog you want!</h4>
      <Link to="/home">
        <button className="button_landing">¡Start!</button>
      </Link>
    </div>
  );
}
