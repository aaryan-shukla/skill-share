"use client";

import React, { useState } from "react";
import styles from "../styles/navBar.module.css";
import { useRouter } from "next/navigation";
export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const handleNavigate = () => {
    router.push("/userProfile");
  };
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLeft}>
        <img src="/logo.png" alt="Skill Share Logo" className={styles.logo} />
        <span className={styles.brandName}>SKILL </span>
        <span className={styles.brandName1}>SHARE</span>
      </div>
      <div className={styles.navbarRight}>
        <div className={styles.profileIcon} onClick={toggleDropdown}>
          <img
            src="/profile.jpg"
            alt="Profile Icon"
            className={styles.profileImage}
          />
        </div>
        {dropdownOpen && (
          <div className={styles.dropdownMenu} onClick={handleNavigate}>
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
