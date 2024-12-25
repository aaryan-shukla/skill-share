import React from "react";
import "../styles/cardComponent.css";
import { CardProps } from "@/app/types";
const CardComponent: React.FC<CardProps> = ({
  title,
  description,
  bgImageSource,
  tabUrl,
}) => {
  return (
    <div className="card">
      <a href={tabUrl} target="_blank" rel="noopener noreferrer">
        <div className="card-image">
          <img src={bgImageSource} alt="Card Image" className="cardImage" />
        </div>
        <div className="card-content">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </a>
    </div>
  );
};
export default CardComponent;
