"use client";

import React from "react";

import FormCard from "@/app/components/LoginFormCard/formCard";

const LearnerLogin = () => {
  const handleSubmit = () => {};
  return (
    <FormCard
      heading="Log In"
      imageSource="/skillShareFormLearnerImage.jpeg"
      onSubmit={handleSubmit}
    />
  );
};

export default LearnerLogin;
