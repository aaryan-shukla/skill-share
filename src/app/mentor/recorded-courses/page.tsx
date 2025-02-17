"use client";

import Navbar from "@/app/components/NavBar/page";
import React, { useState } from "react";
import styles from "../recorded-courses/recordedCourses.module.css";
import CourseCardComponent from "@/app/components/MentoraTab/CoursesCards/page";
import Modal from "@/app/components/Modal";
import { useRouter } from "next/navigation";

export default function RecordedLecture() {
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
    {
      id: 2,
      title: "Mastering React for Beginners",
      author: "React Academy, John Doe",
      price: 799,
      originalPrice: 1599,
      rating: 4.8,
      imageUrl: "/skillshare1.jpeg",
    },
    {
      id: 55,
      title: "Python for Data Science",
      author: "DataCamp, Jane Smith",
      price: 999,
      originalPrice: 1999,
      rating: 3.5,
      imageUrl: "/skillshare.jpeg",
    },
    {
      id: 223,
      title: "Python for Data Science",
      author: "DataCamp, Jane Smith",
      price: 999,
      originalPrice: 1999,
      rating: 3.5,
      imageUrl: "/skillShareFormLearnerImage.jpeg",
    },
    {
      id: 26,
      title: "Python for Data Science",
      author: "DataCamp, Jane Smith",
      price: 999,
      originalPrice: 1999,
      rating: 3.5,
      imageUrl: "/skillshare.jpeg",
    },
    {
      id: 25,
      title: "Python for Data Science",
      author: "DataCamp, Jane Smith",
      price: 999,
      originalPrice: 1999,
      rating: 3.5,
      imageUrl: "/skillshare1.jpeg",
    },
    {
      id: 24,
      title: "Python for Data Science",
      author: "DataCamp, Jane Smith",
      price: 999,
      originalPrice: 1999,
      rating: 3.5,
      imageUrl: "/skillShareFormLearnerImage.jpeg",
    },
    {
      id: 23,
      title: "Python for Data Science",
      author: "DataCamp, Jane Smith",
      price: 999,
      originalPrice: 1999,
      rating: 3.5,
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
      <div>
        <Navbar />
        <div className={styles.searchFilterContainer}>
          <div>
            <button
              className={styles.filterButton}
              onClick={openModal}></button>
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
              onClick={handleSearch}></button>
          </div>
        </div>
        <div className={styles.courseList}>
          {filteredCourses.map((course, index) => (
            <CourseCardComponent
              key={index}
              title={course.title}
              author={course.author}
              price={course.price}
              originalPrice={course.originalPrice}
              rating={course.rating}
              imageUrl={course.imageUrl}
              onEdit={() => handleEdit(course.id)}
              onView={() => handleView(course.id)}
            />
          ))}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
}
