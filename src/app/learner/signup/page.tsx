"use client";

import React from "react";

import { learnerSignUpFields } from "@/app/constants/constant";
import FormCard from "@/app/components/formCard";

const LearnerLogin = () => {
  const handleSubmit = (formData: { [key: string]: string }) => {
    console.log("Form Data:", formData);
  };

  return (
    <FormCard
      fields={learnerSignUpFields}
      heading="Learner Registration"
      imageSource="/skillShareFormLearnerImage.jpeg"
      onSubmit={handleSubmit}
    />
  );
};

export default LearnerLogin;
