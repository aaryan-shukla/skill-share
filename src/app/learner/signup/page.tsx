"use client";

import React from "react";
import FormCard from "@/app/components/SignUpFormCard/formCard";

const LearnerRegistration = () => {
  const handleSubmit = () => {};

  return (
    <FormCard
      heading="Learner Registration"
      imageSource="/skillShareFormLearnerImage.jpeg"
      onSubmit={handleSubmit}
    />
  );
};

export default LearnerRegistration;
