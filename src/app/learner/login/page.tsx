"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormCard from "@/app/components/LoginFormCard/formCard";
import axios from "axios";
import { Backdrop, CircularProgress } from "@mui/material";
const LearnerLogin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (email: string, password: string) => {
    setLoading(true);
    setError("");
    //abcd@abcd.com
    //abcd1234
    try {
      const response = await axios.post(
        "http://localhost:3001/api/login/learner",
        {
          email: email.trim(),
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const { user } = response.data;
      console.log(user);
      localStorage.setItem("user", JSON.stringify(user));
      router.replace("/pages/MentorHomePage");
    } catch (error: unknown) {
      console.error("Sign in error:", error);
      let errorMessage = "An error occurred during login";

      if (error instanceof Error) {
        const firebaseError = error as Error;
        switch (firebaseError.cause) {
          case "auth/user-not-found":
            errorMessage =
              "No account found with this email. Please register first.";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password. Please try again.";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email address format.";
            break;
          case "auth/user-disabled":
            errorMessage =
              "This account has been disabled. Please contact support.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many failed attempts. Please try again later.";
            break;
          case "auth/invalid-credential":
            errorMessage =
              "Invalid email or password. Please check your credentials.";
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
        heading="Log In"
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

export default LearnerLogin;
