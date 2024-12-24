"use client";

import React, { useState } from "react";
import "../styles/navBar.css";

export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="logo.png" alt="Skill Share Logo" className="logo" />
        <span className="brand-name">SKILL </span>
        <span className="brand-name-1">SHARE</span>
      </div>
      <div className="navbar-right">
        <div className="profile-icon" onClick={toggleDropdown}>
          <img src="profile.jpg" alt="Profile Icon" className="profile-image" />
        </div>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <ul>
              <li>My Profile</li>
              <li>Settings</li>
              <li>Logout</li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
