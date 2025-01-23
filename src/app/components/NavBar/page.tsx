"use client";

import React, { useState } from "react";
import styles from "../styles/navBar.module.css";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store/userdetailsStore";
import ConfirmModal from "../confirmationModal";
export default function Navbar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { selectedUser, clearUser } = useUserStore();
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const confirmLogout = () => {
    clearUser();
    setIsModalOpen(false);
    router.push("/mentor/login");
  };
  const handleLogout = () => {
    setIsModalOpen(true);
  };
  const profileImage = selectedUser?.photoUrl;
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbarLeft}>
          <img src="/logo.png" alt="Skill Share Logo" className={styles.logo} />
          <span className={styles.brandName}>SKILL </span>
          <span className={styles.brandName1}>SHARE</span>
        </div>
        <div className={styles.navbarRight}>
          <div className={styles.profileIcon} onClick={toggleDropdown}>
            <img
              src={profileImage}
              alt="Profile Icon"
              className={styles.profileImage}
            />
          </div>
          {dropdownOpen && (
            <div className={styles.dropdownMenu}>
              <ul>
                <li onClick={() => router.push("/userProfile")}>My Profile</li>
                <li>Settings</li>
                <li onClick={handleLogout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      </nav>
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmLogout}
        message="Are you sure you want to logout?"
      />
    </>
  );
}
