"use client";

import React from "react";
import { Card, Button } from "@mui/material";
import { UserData } from "@/app/types";
import { useUserStore } from "../../store/userdetailsStore";
import "./formCard.css";

type FormCardProps = {
  heading: string;
  imageSource: string;
  onSubmit: (formData: UserData) => void;
  error?: string;
};

const FormCard: React.FC<FormCardProps> = ({
  heading,
  imageSource,
  onSubmit,
  error,
}) => {
  const { selectedUser, setUser } = useUserStore();

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

  return (
    <div className="container">
      <Card className="card">
        <div className="relative h-48">
          <img
            src={imageSource}
            alt="Form Background"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-6 text-center">{heading}</h2>

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

            <input
              className="form-control"
              type="text"
              placeholder="Photo URL"
              name="photoUrl"
              value={selectedUser.photoUrl}
              onChange={handleChange}
            />

            <input
              className="form-control"
              type="text"
              placeholder="Address"
              name="address"
              value={selectedUser.address}
              onChange={handleChange}
            />
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
        </div>
      </Card>
    </div>
  );
};

export default FormCard;
