"use client";

import React from "react";
import "../components/styles/rightLandingComponentStyle.css";
import Button from "./button";
const RightSideComponent = () => {
  return (
    <div className="right-side-content">
      <div className="vector-container">
        <img
          src="/rb_872.png"
          alt="Vector Illustration"
          className="vector-image"
        />
      </div>
      <div className="text-overlay">
        <h2 className="right-side-heading">
          Ready to Unlock Knowledge, Share Skills, and Grow?
        </h2>
        <Button text="Get Started" />
      </div>
    </div>
  );
};

export default RightSideComponent;
