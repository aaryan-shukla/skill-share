import React from "react";
import styles from "../styles/cardComponent.module.css";
import { CardProps } from "@/app/types";
const CardComponent: React.FC<CardProps & { onClick?: () => void }> = ({
  title,
  description,
  bgImageSource,
  tabUrl,
  onClick,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };
  return (
    <div className={styles.card}>
      <a
        href={tabUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}>
        <div className={styles.cardImage1}>
          <img
            src={bgImageSource}
            alt="Card Image"
            className={styles.cardImage}
          />
        </div>
        <div className={styles.cardContent}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </a>
    </div>
  );
};
export default CardComponent;
