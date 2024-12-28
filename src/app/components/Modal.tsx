"use client";

import "../components/styles/modal.css";
import React, { useEffect, useState } from "react";
import { ModalProps } from "../types";

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    skills: "",
    folderName: "",
    price: "",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        setFormData((prev) => ({
          ...prev,
          folderName: file.name,
        }));
      } else {
        alert("Please upload a valid image file.");
        event.target.value = ""; // Reset input
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible && !isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2 className="modal-title">Add More Courses</h2>
        <p className="modal-text">Fill out the details below:</p>

        <form className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter course name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter course description"></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="skills">Skills Covered:</label>
            <input
              type="text"
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="Enter skills covered"
            />
          </div>
          <div className="form-group-row">
            <div className="form-group">
              <label htmlFor="price">Set the Price for Courses:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Course Price"
              />
            </div>
            <div className="form-group">
              <label htmlFor="folder">Upload Image:</label>
              <input
                type="file"
                id="folder"
                name="folder"
                accept="image/*"
                onChange={handleFileChange}
              />
              {formData.folderName && (
                <p className="folder-name">
                  Selected Image: {formData.folderName}
                </p>
              )}
            </div>
          </div>
        </form>
        <button
          type="button"
          className="modal-submit-button"
          onClick={() => {
            console.log("Submitted Data:", formData);
            onClose();
          }}>
          Submit
        </button>

        <button className="modal-close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
