"use client";
import React from "react";
import "../components/styles/landingPageButton.css";
import { LandingButtonProps } from "../types";

export const Button = ({ text }: LandingButtonProps) => {
  return (
    <button className="button-64" role="button">
      <span className="text">{text}</span>
    </button>
  );
};

export default Button;
