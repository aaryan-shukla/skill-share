"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormCard from "@/app/components/SignUpFormCard/formCard";
import { useUserStore } from "@/app/store/userdetailsStore";
import axios from "axios";
import { CircularProgress, Backdrop } from "@mui/material";

const LearnerRegistration = () => {
  const selectedUser = useUserStore((state) => state.selectedUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    try {
      await axios.post(
        "http://localhost:3001/api/register/learner",
        {
          email: selectedUser.email.trim(),
          password: selectedUser.password,
          name: selectedUser.name,
          phoneNumber: selectedUser.phoneNumber,
          photoUrl: selectedUser.photoUrl,
          address: selectedUser.address,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      router.replace("/learner/login");
    } catch (error: unknown) {
      console.error("Sign up error:", error);
      let errorMessage = "An error occurred during registration";

      if (error instanceof Error) {
        const firebaseError = error as Error;
        switch (firebaseError.cause) {
          case "auth/email-already-in-use":
            errorMessage = "This email is already registered";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email address";
            break;
          case "auth/weak-password":
            errorMessage = "Password should be at least 6 characters";
            break;
        }
      }

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <FormCard
        heading="Learner Registration"
        imageSource="/skillShareFormLearnerImage.jpeg"
        onSubmit={handleSubmit}
        error={error}
      />
      <Backdrop
        open={loading}
        sx={{
          color: "#fff",
          zIndex: 1301,
        }}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
};

export default LearnerRegistration;
