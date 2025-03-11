"use client";

import React from "react";
import { Card, Button } from "@mui/material";
import { useUserStore } from "../../store/userdetailsStore";
import "./formCard.css";
import { FormCardProps } from "@/app/types";
import { useRouter } from "next/navigation"; // Changed from next/router to next/navigation

const FormCard: React.FC<FormCardProps> = ({
  heading,
  imageSource,
  onSubmit,
  error,
}) => {
  const { selectedUser, setUser } = useUserStore();
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser({
      ...selectedUser,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    onSubmit(selectedUser);
  };

  const navigateToLogin = () => {
    router.push("/mentor/login");
  };

  return (
    <div className="container">
      <Card className="card">
        <div className="formImageContainer">
          <img src={imageSource} alt="Form Background" className="formImage" />
        </div>

        <div className="form-content">
          <h2 className="form-heading">{heading}</h2>

          <div className="scrollable-form">
            <div className="inputContainer">
              <input
                className="form-control"
                type="text"
                placeholder="Name"
                name="name"
                value={selectedUser.name}
                onChange={handleChange}
              />

              <input
                className="form-control"
                type="email"
                placeholder="Email"
                name="email"
                value={selectedUser.email}
                onChange={handleChange}
              />

              <input
                className="form-control"
                type="tel"
                placeholder="Phone Number"
                name="phoneNumber"
                value={selectedUser.phoneNumber || ""}
                onChange={handleChange}
              />

              <input
                className="form-control"
                type="password"
                placeholder="Password"
                name="password"
                value={selectedUser.password}
                onChange={handleChange}
              />

              {/* <input
                className="form-control"
                type="text"
                placeholder="Photo URL"
                name="photoUrl"
                value={selectedUser.photoUrl}
                onChange={handleChange}
              /> */}

              <input
                className="form-control"
                type="text"
                placeholder="Address"
                name="address"
                value={selectedUser.address}
                onChange={handleChange}
              />
            </div>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}

          <Button
            variant="contained"
            className="submit-btn"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <p>Already a user?</p>
            <Button
              onClick={navigateToLogin}
              className="submit-btn"
              variant="contained"
            >
              Login
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default FormCard;
