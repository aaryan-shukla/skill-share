"use client";
import React, { useState } from "react";
import { Card, Button } from "@mui/material";
import "./formCard.css";
interface FormCardProps {
  heading: string;
  imageSource: string;
  onSubmit: (email: string, password: string) => void;
  error?: string;
}
const FormCard: React.FC<FormCardProps> = ({
  heading,
  imageSource,
  onSubmit,
  error,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    onSubmit(email, password);
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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
            />
          </div>
          <Button
            variant="contained"
            className="submit-btn"
            onClick={handleSubmit}
          >
            Log In
          </Button>
          {error && (
            <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
          )}
        </div>
      </Card>
    </div>
  );
};
export default FormCard;
