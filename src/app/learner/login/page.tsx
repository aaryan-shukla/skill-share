"use client";

import React from "react";
import { learnerLoginFields } from "@/app/constants/constant";
import FormCard from "@/app/components/formCard";

const LearnerLogin = () => {
  const handleSubmit = (formData: { [key: string]: string }) => {
    console.log("Form Data:", formData);
  };
  return (
    <FormCard
      fields={learnerLoginFields}
      heading="Log In"
      imageSource="/skillShareFormLearnerImage.jpeg"
      onSubmit={handleSubmit}
    />
  );
};

export default LearnerLogin;
