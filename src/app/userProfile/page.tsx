"use client";

import React, { useState } from "react";
import "../styles/userProfile.css";
import Navbar from "../components/NavBar/page";
const UserProfile = () => {
  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});
  const [userInfo, setUserInfo] = useState<Record<string, string>>({
    name: "Aaryan Shukla",
    email: "aaryanshukla@example.com",
    gender: "Male",
    location: "India, Uttar Pradesh, Agra",
    birthday: "July 1, 2002",
    summary: "Tell us about yourself (interests, experience, etc.)",
    website: "Your blog, portfolio, etc.",
    github: "https://github.com/aaryan-shukla",
    linkedin: "https://linkedin.com/in/aaryan-shukla-b721441bb",
    twitter: "Your X (formerly Twitter) username or URL",
  });

  const [editedInfo, setEditedInfo] =
    useState<Record<string, string>>(userInfo);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setEditedInfo({ ...editedInfo, [field]: e.target.value });
  };

  const handleEditClick = (field: string) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSaveClick = (field: string) => {
    setUserInfo({ ...userInfo, [field]: editedInfo[field] });
    setIsEditing({ ...isEditing, [field]: false });
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        {/* Header Section */}
        <div className="profile-header">
          <div className="profile-photo-container">
            <img className="profile-photo" src="profile.jpg" alt="Profile" />
            <div className="photo-options">
              <button className="button">Edit</button>
            </div>
          </div>
          <div className="profile-info">
            <h1>{userInfo.name}</h1>
            <p className="email">{userInfo.email}</p>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="profile-details">
          <h2 className="profile-details-heading">Basic Info</h2>
          {Object.keys(userInfo).map((field) => (
            <div className="info-row" key={field}>
              <label className="info-label">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {isEditing[field] ? (
                <input
                  className="input-field"
                  type="text"
                  value={editedInfo[field]}
                  onChange={(e) => handleInputChange(e, field)}
                />
              ) : (
                <p>{userInfo[field]}</p>
              )}
              {isEditing[field] ? (
                <button
                  className="edit-button"
                  onClick={() => handleSaveClick(field)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(field)}
                >
                  Edit
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
