import React from "react";
import CardComponent from "../components/MentoraTab/CardComponent/page";
import "../components/styles/mentorHomePage.css";
import { cardData } from "../constants/constant";
import Navbar from "../components/NavBar/page";
export default function MentorHomePage() {
  return (
    <div>
      <Navbar />
      <div className="header-container">
        <h1>Your Teaching, Your Way</h1>
        <p className="typing-effect">
          Engage learners with live courses, recorded lectures, and one-on-one
          mentorship.
        </p>
      </div>
      <div className="cardContainer">
        {cardData.map((card, index) => (
          <CardComponent
            key={index}
            title={card.title}
            description={card.description}
            bgImageSource={card.bgImageSource}
            tabUrl={card.tabUrl}
          />
        ))}
      </div>
    </div>
  );
}
