"use client";

import React, { useState } from "react";
import styles from "../mentorship/mentorship.module.css";
import Navbar from "@/app/components/NavBar/page";
import TimePicker from "react-time-picker";
const MentorshipTable = () => {
  const [data, setData] = useState([
    {
      id: 1,
      name: "Aaryan Shukla",
      description: "1 HR Mentorship",
      date: "08/01/2025",
      timeSlot: { start: "15:00", end: "17:00" },
      selectedTime: "",
      canceled: false,
    },
    {
      id: 2,
      name: "Pritam",
      description: "2 HR Mentorship",
      date: "09/01/2025",
      timeSlot: { start: "10:00", end: "12:00" },
      selectedTime: "",
      canceled: false,
    },
    {
      id: 3,
      name: "Raunak",
      description: "1 HR Mentorship",
      date: "18/01/2025",
      timeSlot: { start: "12:00", end: "17:00" },
      selectedTime: "",
      canceled: false,
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [selectedMinute, setSelectedMinute] = useState<string>("");
  const openModal = (id: number) => {
    const row = data.find((item) => item.id === id);
    if (row) {
      const [startHour] = row.timeSlot.start.split(":");
      setSelectedHour(startHour);
      setSelectedMinute("00");
    }
    setSelectedRowId(id);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedRowId(null);
    setSelectedHour("");
    setSelectedMinute("");
  };
  const handleChangeTimeClick = (id: number) => {
    const proposedTime = prompt(
      "Propose a new time (24-hour format, e.g., 14:00-15:00):"
    );

    if (proposedTime) {
      alert(`Proposed time: ${proposedTime}. This request will be reviewed.`);
    }
  };
  const handleSaveTime = () => {
    if (selectedRowId !== null) {
      const row = data.find((item) => item.id === selectedRowId);
      if (!row) {
        alert("Row not found.");
        return;
      }

      const { start, end } = row.timeSlot;
      const [startHour, startMinute] = start.split(":").map(Number);
      const [endHour, endMinute] = end.split(":").map(Number);

      const selectedStartHour = parseInt(selectedHour);
      const selectedStartMinute = parseInt(selectedMinute);

      if (
        selectedStartHour > endHour ||
        (selectedStartHour === endHour && selectedStartMinute > endMinute) ||
        selectedStartHour < startHour ||
        (selectedStartHour === startHour && selectedStartMinute < startMinute)
      ) {
        alert(
          "Invalid time selection. Please select a valid time within the slot."
        );
        return;
      }

      const formattedTime = `${selectedHour}:${selectedMinute}`;
      setData(
        data.map((item) =>
          item.id === selectedRowId
            ? { ...item, selectedTime: formattedTime }
            : item
        )
      );
      closeModal();
    }
  };
  const handleCancelClick = (id: number) => {
    setData(
      data.map((item) => (item.id === id ? { ...item, canceled: true } : item))
    );
  };
  return (
    <>
      <Navbar />
      <div className={styles.tableContainer}>
        <table className={styles.mentorshipTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Date</th>
              <th>Time Slot</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id}>
                <td>{row.name}</td>
                <td>{row.description}</td>
                <td>{row.date}</td>
                <td>
                  {row.timeSlot.start} - {row.timeSlot.end}
                  {row.selectedTime && (
                    <div className="selected-time">
                      Selected: {row.selectedTime}
                    </div>
                  )}
                </td>
                <td className={styles.actions}>
                  {!row.canceled && (
                    <>
                      <button onClick={() => openModal(row.id)}>✅</button>
                      <button onClick={() => handleChangeTimeClick(row.id)}>
                        ⏲️
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => handleCancelClick(row.id)}
                    disabled={row.canceled}>
                    {row.canceled ? "Declined" : "❌"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Select Time</h3>
            <div className={styles.timePicker}>
              <label>
                Hour:{" "}
                <select
                  value={selectedHour}
                  onChange={(e) => setSelectedHour(e.target.value)}>
                  {Array.from(
                    {
                      length:
                        parseInt(
                          data[selectedRowId! - 1].timeSlot.end.split(":")[0]
                        ) -
                        parseInt(
                          data[selectedRowId! - 1].timeSlot.start.split(":")[0]
                        ) +
                        1,
                    },
                    (_, i) =>
                      String(
                        parseInt(
                          data[selectedRowId! - 1].timeSlot.start.split(":")[0]
                        ) + i
                      ).padStart(2, "0")
                  ).map((hour) => (
                    <option key={hour} value={hour}>
                      {hour}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Minutes:{" "}
                <select
                  value={selectedMinute}
                  onChange={(e) => setSelectedMinute(e.target.value)}>
                  {[0, 15, 30, 45].map((minute) => (
                    <option
                      key={minute}
                      value={minute.toString().padStart(2, "0")}>
                      {minute.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <div className={styles.modalActions}>
              <button onClick={handleSaveTime}>Save</button>
              <button onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MentorshipTable;
