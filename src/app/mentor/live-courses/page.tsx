"use client";

import Navbar from "@/app/components/NavBar/page";
import React, { useState } from "react";
import styles from "./livecourses.module.css";
import { useRouter } from "next/navigation";
export default function LiveCourses() {
  const router = useRouter();
  const courses = [
    {
      id: 1,
      title: "How to Budget and Forecast for Your Business",
      author: "Bplans School of Business, Tim Berry",
      price: 549,
      originalPrice: 2299,
      rating: 4.2,
      imageUrl: "/skillshare.jpeg",
    },
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSearch = () => {
    const filtered = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCourses(filtered);
  };
  const handleKeyPress = (e: { key: string }) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleEdit = (courseId: number) => {
    router.push(`/mentor/recorded-courses/${courseId}/edit`);
  };

  const handleView = (courseId: number) => {
    router.push(`/mentor/recorded-courses/${courseId}/view`);
  };
  return (
    <>
      <Navbar />
      <div className={styles.searchFilterContainer}>
        <div>
          <button className={styles.filterButton} onClick={openModal}></button>
        </div>
        <span className={styles.coursesText}>Add More Courses</span>
        <div className={styles.searchBar}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search courses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button
            className={styles.searchButton}
            onClick={handleSearch}
          ></button>
        </div>
      </div>
    </>
  );
}
