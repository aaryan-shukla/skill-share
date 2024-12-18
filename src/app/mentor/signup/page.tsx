"use client";

import React from "react";

import { mentorSignUpFields } from "@/app/constants/constant";
import FormCard from "@/app/components/formCard";

const LearnerLogin = () => {
  const handleSubmit = (formData: { [key: string]: string }) => {
    console.log("Form Data:", formData);
  };

  return (
    <FormCard
      fields={mentorSignUpFields}
      heading="Mentor Registration"
      imageSource="/skillShare.jpeg"
      onSubmit={handleSubmit}
    />
  );
};

export default LearnerLogin;
