"use client";

import React, { useState } from "react";
import "../components/styles/formCard.css";
import { Card, Button } from "@mui/material";
import { FormCardProps } from "../constants/types";

const FormCard: React.FC<FormCardProps> = ({
  fields,
  heading,
  imageSource,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<{ [key: string]: string }>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: "" }), {})
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };
  console.log(formData);
  return (
    <div className="container">
      <Card className="card">
        <div className="formImageContainer">
          <img src={imageSource} alt="Form Background" className="formImage" />
        </div>
        <h2>{heading}</h2>
        <div className="inputContainer">
          {fields.map((field, index) => (
            <input
              key={index}
              className="form-control"
              type={field.type}
              placeholder={field.placeholder}
              name={field.name}
              value={formData[field.name]}
              onChange={handleChange}
            />
          ))}
        </div>
        <Button
          variant="contained"
          className="submit-btn"
          onClick={handleSubmit}>
          Submit
        </Button>
      </Card>
    </div>
  );
};

export default FormCard;
