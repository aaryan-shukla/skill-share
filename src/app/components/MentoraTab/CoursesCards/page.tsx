"use client";

import React from "react";
import styles from "../../styles/coursesCard.module.css";
import { CourseCardProps } from "@/app/types";

interface ExtendedCourseCardProps extends CourseCardProps {
  onEdit?: () => void;
  onView?: () => void;
}

const CourseCard: React.FC<ExtendedCourseCardProps> = ({
  title,
  author,
  price,
  originalPrice,
  rating,
  imageUrl,
  onEdit,
  onView,
}) => {
  const handleCardClick = () => {
    alert("Card clicked! Redirecting to course details...");
  };

  const generateStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {hasHalfStar && "☆"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    if (onEdit) onEdit();
  };

  const handleViewClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click event
    if (onView) onView();
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card} onClick={handleCardClick}>
        <img
          src={imageUrl}
          alt="Course Thumbnail"
          className={styles.cardImage}
        />
        <div className={styles.cardContent}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardAuthor}>{author}</p>
          <div className={styles.cardRating}>
            <span className={styles.ratingValue}>{rating}</span>
            <span className={styles.stars}>{generateStars(rating)}</span>
          </div>
          <div className={styles.cardPrice}>
            <span className={styles.currentPrice}>&#8377;{price}</span>
            <span className={styles.originalPrice}>&#8377;{originalPrice}</span>
          </div>
        </div>
        <div className={styles.cardButtons}>
          <button className={styles.viewButton} onClick={handleViewClick}>
            View
          </button>
          <button className={styles.editButton} onClick={handleEditClick}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
