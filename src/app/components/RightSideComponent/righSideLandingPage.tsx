"use client";

import React, { useState } from "react";
import "./rightLandingComponentStyle.css";
import Button from "../Button/button";
import { useRouter } from "next/navigation";

const RightSideComponent = () => {
  const [isGetStartedClicked, setIsGetStartedClicked] = useState(false);
  const [activeRole, setActiveRole] = useState<"mentor" | "learner" | null>(
    null
  );
  const [isButtonsVisible, setIsButtonsVisible] = useState(false);
  const router = useRouter();

  const handleGetStartedClick = () => {
    setIsGetStartedClicked(true);
    setTimeout(() => {
      setIsButtonsVisible(true);
    }, 100);
  };

  const handleRoleSelect = (role: "mentor" | "learner") => {
    setActiveRole(role);
  };

  const handleSignUp = () => {
    if (activeRole === "mentor") {
      router.push("/mentor/signup");
    } else if (activeRole === "learner") {
      router.push("/learner/signup");
    }
  };

  const handleLogin = () => {
    if (activeRole === "mentor") {
      router.push("/mentor/login");
    } else if (activeRole === "learner") {
      router.push("/learner/login");
    }
  };

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
        {!isGetStartedClicked ? (
          <Button text="Get Started" onClick={handleGetStartedClick} />
        ) : activeRole === null ? (
          <div className={`login-buttons ${isButtonsVisible ? "visible" : ""}`}>
            <Button text="Mentor" onClick={() => handleRoleSelect("mentor")} />
            <Button
              text="Learner"
              onClick={() => handleRoleSelect("learner")}
            />
          </div>
        ) : (
          <div className={`role-buttons ${isButtonsVisible ? "visible" : ""}`}>
            <Button text="Sign Up" onClick={handleSignUp} />
            <Button text="Login" onClick={handleLogin} />
          </div>
        )}
      </div>
    </div>
  );
};

export default RightSideComponent;
