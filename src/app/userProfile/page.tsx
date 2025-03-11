"use client";

import React, { useState, useEffect } from "react";
import "../styles/userProfile.css";
import Navbar from "../components/NavBar/page";
import { useUserStore } from "../store/userdetailsStore";
import axios from "axios";

const UserProfile = () => {
  const { selectedUser, setUser } = useUserStore();
  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});
  const [editedInfo, setEditedInfo] = useState(selectedUser);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const role = "mentors";

        console.log("Fetching user details for:", selectedUser.email);

        const response = await axios.get(
          `http://localhost:3001/api/user/${role}/${selectedUser.email}`
        );

        console.log("API Response data:", response.data);

        if (response.data) {
          setUser(response.data);
          setEditedInfo(response.data);
          setUser(response.data);
        }
      } catch (err) {
        console.error("Failed to fetch user details:", err);
        if (axios.isAxiosError(err)) {
          setError(err.response?.data?.error || "Failed to load user details");
        } else {
          setError("An unexpected error occurred while loading user data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    setError("");
    setEditedInfo({ ...editedInfo, [field]: e.target.value });
  };

  const handleEditClick = (field: string) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSaveClick = async (field: string) => {
    try {
      setLoading(true);

      const updateData = {
        email: selectedUser.email,
        [field]: editedInfo[field],
      };

      const role = selectedUser.role || "mentors";
      const url = `http://localhost:3001/api/update/${role}/${selectedUser.email}`;

      const response = await axios({
        method: "put",
        url: url,
        data: updateData,
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Update response:", response.data);

      setUser({
        ...selectedUser,
        [field]: editedInfo[field],
      });

      setIsEditing({ ...isEditing, [field]: false });
    } catch (err) {
      console.error("Error updating user data:", err);

      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Failed to update user data");
      } else {
        setError(
          err instanceof Error ? err.message : "An unexpected error occurred"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading && Object.keys(selectedUser).length <= 1) {
    return (
      <>
        <Navbar />
        <div className="profile-container">
          <p>Loading user profile...</p>
        </div>
      </>
    );
  }

  const basicInfoFields = [
    { key: "name", label: "Name" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "address", label: "Address" },
    { key: "birthday", label: "Date of Birth", type: "date" },
    { key: "summary", label: "Summary", type: "textarea" },
  ];

  const socialLinks = [
    {
      key: "linkedin",
      label: "LinkedIn",
      placeholder: "Add LinkedIn profile URL",
    },
    { key: "github", label: "GitHub", placeholder: "Add GitHub profile URL" },
    {
      key: "twitter",
      label: "Twitter",
      placeholder: "Add Twitter profile URL",
    },
    {
      key: "website",
      label: "Website",
      placeholder: "Add personal website URL",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-photo-container">
            <img
              className="profile-photo"
              src={selectedUser.photoUrl}
              alt="Profile"
            />
            <div className="photo-options">
              <button className="button">Edit</button>
            </div>
          </div>
          <div className="profile-info">
            <h1>{selectedUser.name || "Unknown User"}</h1>
            <p className="email">{selectedUser.email}</p>
          </div>
        </div>

        <div className="profile-details">
          <h2 className="profile-details-heading">Basic Info</h2>
          {error && <div className="error-message">{error}</div>}
          {loading && (
            <div className="loading-indicator">Saving changes...</div>
          )}

          {basicInfoFields.map(({ key, label, type }) => (
            <div className="info-row" key={key}>
              <label className="info-label">{label}</label>
              {isEditing[key] ? (
                type === "textarea" ? (
                  <textarea
                    className="input-field textarea-field"
                    value={editedInfo[key] || ""}
                    onChange={(e) => handleInputChange(e, key)}
                  />
                ) : (
                  <input
                    className="input-field"
                    type={type || "text"}
                    value={editedInfo[key] || ""}
                    onChange={(e) => handleInputChange(e, key)}
                  />
                )
              ) : (
                <p>{selectedUser[key] || "Not provided"}</p>
              )}
              {isEditing[key] ? (
                <button
                  className="edit-button"
                  onClick={() => handleSaveClick(key)}
                  disabled={loading}
                >
                  Save
                </button>
              ) : (
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(key)}
                  disabled={loading}
                >
                  Edit
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="profile-details">
          <h2 className="profile-details-heading">Social Links</h2>

          {socialLinks.map(({ key, label, placeholder }) => (
            <div className="info-row" key={key}>
              <label className="info-label">{label}</label>
              {isEditing[key] ? (
                <input
                  className="input-field"
                  type="text"
                  value={editedInfo[key] || ""}
                  placeholder={placeholder}
                  onChange={(e) => handleInputChange(e, key)}
                />
              ) : (
                <p>
                  {selectedUser[key] ? (
                    <a
                      href={selectedUser[key]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {selectedUser[key]}
                    </a>
                  ) : (
                    "Not provided"
                  )}
                </p>
              )}
              {isEditing[key] ? (
                <button
                  className="edit-button"
                  onClick={() => handleSaveClick(key)}
                  disabled={loading}
                >
                  Save
                </button>
              ) : (
                <button
                  className="edit-button"
                  onClick={() => handleEditClick(key)}
                  disabled={loading}
                >
                  Edit
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .textarea-field {
          flex: 2;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid rgb(218, 46, 46);
          box-shadow: 0px 4px 8px rgba(254, 6, 6, 0.324);
        }
      `}</style>
    </>
  );
};

export default UserProfile;
