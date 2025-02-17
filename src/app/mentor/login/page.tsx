"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormCard from "@/app/components/LoginFormCard/formCard";
import axios from "axios";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useUserStore } from "@/app/store/userdetailsStore";
const MentorLogin = () => {
  const router = useRouter();

  const { login, loading, error } = useUserStore();

  const handleSubmit = async (email: string, password: string) => {
    try {
      await login(email.trim(), password);
      if (!error) {
        router.replace("/pages/MentorHomePage");
      } else {
        console.error("Error during login:", error);
      }
    } catch (err) {
      console.error("Unexpected error during login:", err);
    }
  };
  return (
    <>
      <FormCard
        heading="Log In"
        imageSource="/skillShare.jpeg"
        onSubmit={handleSubmit}
        // error={error}
      />
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <p>Don't have an account?</p>
        <Button
          onClick={() => router.push("/mentor/signup")}
          variant="contained">
          Sign Up
        </Button>
      </div>
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

export default MentorLogin;
