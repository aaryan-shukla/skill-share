"use client";
import React from "react";
import "../../pages/LandingPage/landingPageButton.css";
import { LandingButtonProps } from "../../types";

export const Button = ({ text, onClick }: LandingButtonProps) => {
  return (
    <button className="button-64" role="button" onClick={onClick}>
      <span className="text">{text}</span>
    </button>
  );
};

export default Button;
