"use client";

import React from "react";
import "./landingPageImage.css";
import RightSideComponent from "../../components/RightSideComponent/righSideLandingPage";

export default function LandingPage() {
  return (
    <div className="hero">
      <div className="hero__image-container">
        <div className="hero__overlay"></div>
      </div>
      <div className="hero__content">
        <h1 className="hero_heading">Skill Share</h1>
        <p className="hero_tagline">
          From learning to thriving together, SkillShare bridges gaps like never
          before.
        </p>
      </div>
      <div className="hero__right">
        <RightSideComponent />
      </div>
    </div>
  );
}
