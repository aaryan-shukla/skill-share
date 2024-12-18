"use client";

import React from "react";

import { mentorLoginFields } from "@/app/constants/constant";
import FormCard from "@/app/components/formCard";

const LearnerLogin = () => {
  const handleSubmit = (formData: { [key: string]: string }) => {
    console.log("Form Data:", formData);
  };

  return (
    <FormCard
      fields={mentorLoginFields}
      heading="Log In"
      imageSource="/skillShare.jpeg"
      onSubmit={handleSubmit}
    />
  );
};

export default LearnerLogin;
