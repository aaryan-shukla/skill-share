"use client";

import React, { useState, useEffect } from "react";
import "../styles/userProfile.css";
import Navbar from "../components/NavBar/page";
import { useUserStore } from "../store/userdetailsStore";
import axios from "axios";

const UserProfile = () => {
  const { selectedUser, setUser } = useUserStore();
  const [clientUser, setClientUser] = useState(selectedUser);
  const [isEditing, setIsEditing] = useState<Record<string, boolean>>({});

  const [editedInfo, setEditedInfo] = React.useState(selectedUser);
  const [error, setError] = useState<string>("");
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setError(""); // Clear any previous errors
    setEditedInfo({ ...editedInfo, [field]: e.target.value });
  };

  const handleEditClick = (field: string) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleSaveClick = async (field: string) => {
    try {
      // Debug logs
      console.log("Attempting to update field:", field);
      console.log("Current user:", selectedUser);
      console.log("Edited info:", editedInfo);

      if (!selectedUser?.id) {
        throw new Error("User ID is missing");
      }

      const updateData = { [field]: editedInfo[field] };
      const url = `http://localhost:3001/api/updateUser/${selectedUser.email}`;

      const response = await axios({
        method: "put",
        url: url,
        data: updateData,
        headers: {
          "Content-Type": "application/json",
        },
        validateStatus: (status) => {
          console.log("Response status:", status);
          return status >= 200 && status < 300;
        },
      });

      console.log("Response received:", response.data);

      setUser({
        ...selectedUser,
        [field]: editedInfo[field],
      });
      setIsEditing({ ...isEditing, [field]: false });
    } catch (err) {
      console.log("Error occurred:", err);
      console.log("Error type:", typeof err);
      console.log("Error properties:", Object.keys(err as object));

      if (axios.isAxiosError(err)) {
        console.error("Request failed:", {
          url: err.config?.url,
          method: err.config?.method,
          data: err.config?.data,
          headers: err.config?.headers,
          status: err.response?.status,
          statusText: err.response?.statusText,
          responseData: err.response?.data,
        });

        const errorMessage =
          err.response?.data?.message ||
          err.response?.statusText ||
          err.message ||
          "Failed to update user data";

        setError(errorMessage);
      } else {
        const errorMessage =
          err instanceof Error ? err.message : "An unexpected error occurred";
        console.error("Non-Axios error:", errorMessage);
        setError(errorMessage);
      }
    }
  };
  useEffect(() => {
    setClientUser(selectedUser); // Ensures client-side rendering
  }, [selectedUser]);
  console.log(selectedUser.photoUrl);
  return (
    <>
      <Navbar />
      <div className="profile-container">
        {/* Header Section */}
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

        {/* Profile Details Section */}
        <div className="profile-details">
          <h2 className="profile-details-heading">Basic Info</h2>
          {Object.entries(selectedUser).map(([field, value]) =>
            value && field !== "id" ? (
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
                  <p>{value}</p>
                )}
                {isEditing[field] ? (
                  <button
                    className="edit-button"
                    onClick={() => handleSaveClick(field)}>
                    Save
                  </button>
                ) : (
                  <button
                    className="edit-button"
                    onClick={() => handleEditClick(field)}>
                    Edit
                  </button>
                )}
              </div>
            ) : null
          )}
        </div>
      </div>
    </>
  );
};

export default UserProfile;
