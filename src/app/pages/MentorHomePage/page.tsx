"use client";

import React, { useState, useEffect } from "react";
import CardComponent from "../../components/MentorServicesCard/page";
import styles from "../../components/styles/mentorHomePage.module.css";
import { cardData } from "../../types/constant";
import Navbar from "../../components/NavBar/page";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store/userdetailsStore";
export default function MentorHomePage() {
  const router = useRouter();
  const [user, setUser] = useState<{
    displayName: string;
    email: string;
  } | null>(null);
  const selectedUser = useUserStore((state) => state.selectedUser);
  console.log(selectedUser);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleCardRoute = (tabUrl: string) => {
    console.log(tabUrl);
    router.push(tabUrl);
  };
  return (
    <div>
      <Navbar />
      {/* Display user details */}

      {/* {selectedUser && (
        <div>
          <p>Welcome, {selectedUser.name || "Mentor"}!</p>
          <p>Your email: {selectedUser.email}</p>
        </div>
      )} */}
      <div className={styles.headerTextContainer}>
        <h1>Your Teaching, Your Way</h1>
        <p className={styles.typingEffect}>
          Engage learners with live courses, recorded lectures, and one-on-one
          mentorship.
        </p>
      </div>
      <div className={styles.headerContainer}>
        {cardData.map((card, index) => (
          <CardComponent
            key={index}
            title={card.title}
            description={card.description}
            bgImageSource={card.bgImageSource}
            tabUrl={card.tabUrl}
            onClick={() => handleCardRoute(card.tabUrl)}
          />
        ))}
      </div>
    </div>
  );
}
