"use client";

import React, { useState } from "react";
import styles from "../mentorship/mentorship.module.css";
import Navbar from "@/app/components/NavBar/page";

const MentorshipTable = () => {
  const [originalData] = useState([
    {
      id: 1,
      name: "Aaryan Shukla",
      description: "1 HR Mentorship",
      date: "08/01/2025",
      timeSlot: { start: "15:00", end: "17:00" },
      selectedTime: "",
      canceled: false,
      accepted: false,
    },
    {
      id: 2,
      name: "Pritam",
      description: "2 HR Mentorship",
      date: "09/01/2025",
      timeSlot: { start: "10:00", end: "12:00" },
      selectedTime: "",
      canceled: false,
      accepted: false,
    },
    {
      id: 3,
      name: "Raunak",
      description: "1 HR Mentorship",
      date: "18/01/2025",
      timeSlot: { start: "12:00", end: "17:00" },
      selectedTime: "",
      canceled: false,
      accepted: false,
    },
  ]);
  const [data, setData] = useState([...originalData]);
  const [dropdownRowId, setDropdownRowId] = useState<number | null>(null);
  const [calendarRowId, setCalendarRowId] = useState<number | null>(null);
  const [proposedDate, setProposedDate] = useState("");
  const [proposedStartTime, setProposedStartTime] = useState("");

  const handleSaveTime = (id: number, selectedTime: string) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, selectedTime, accepted: true } : item
      )
    );
    setDropdownRowId(null);
  };

  const handleSaveProposedTime = (
    id: number,
    newDate: string,
    newStartTime: string
  ) => {
    setData(
      data.map((item) =>
        item.id === id
          ? {
              ...item,
              date: newDate,
              timeSlot: {
                start: newStartTime,
                end: calculateEndTime(newStartTime, item.description),
              },
              accepted: true,
            }
          : item
      )
    );
    setCalendarRowId(null);
    setProposedDate("");
    setProposedStartTime("");
  };

  const calculateEndTime = (startTime: string, description: string) => {
    const mentorshipDuration = parseInt(description.split(" ")[0]);
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const endHour = startHour + mentorshipDuration;
    const endMinute = startMinute;
    return `${String(endHour).padStart(2, "0")}:${String(endMinute).padStart(
      2,
      "0"
    )}`;
  };

  const validateTimeSelection = (
    timeSlot: { start: string; end: string },
    selectedHour: string,
    mentorshipDuration: number
  ) => {
    const [slotStartHour, slotStartMinute] = timeSlot.start
      .split(":")
      .map(Number);
    const [slotEndHour, slotEndMinute] = timeSlot.end.split(":").map(Number);
    const [selectedStartHour, selectedStartMinute] = selectedHour
      .split(":")
      .map(Number);

    const selectedEndHour = selectedStartHour + mentorshipDuration;
    const selectedEndMinute = selectedStartMinute;

    const slotEndInMinutes = slotEndHour * 60 + slotEndMinute;
    const selectedEndInMinutes = selectedEndHour * 60 + selectedEndMinute;

    return selectedEndInMinutes <= slotEndInMinutes;
  };

  const handleRevert = (id: number) => {
    setData(
      data.map((item) => {
        if (item.id === id) {
          const originalItem = originalData.find(
            (original) => original.id === id
          );
          if (originalItem) {
            return {
              ...item,
              date: originalItem.date,
              timeSlot: originalItem.timeSlot,
              selectedTime: "",
              accepted: false,
              canceled: false,
            };
          }
        }
        return item;
      })
    );
  };

  const todayDate = new Date().toISOString().split("T")[0];

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
            {data.map((row) => {
              const mentorshipDuration = parseInt(
                row.description.split(" ")[0]
              );
              const [startHour] = row.timeSlot.start.split(":").map(Number);
              const [endHour] = row.timeSlot.end.split(":").map(Number);

              return (
                <tr key={row.id}>
                  <td>{row.name}</td>
                  <td>{row.description}</td>
                  <td>{row.date || "Not Set"}</td>
                  <td>
                    {row.timeSlot.start
                      ? `${row.timeSlot.start} - ${row.timeSlot.end}`
                      : "Not Set"}
                  </td>
                  <td className={styles.actions}>
                    {row.accepted ? (
                      <>
                        <span>
                          Accepted: {row.date}, {row.timeSlot.start} -{" "}
                          {row.timeSlot.end}
                        </span>
                        <button onClick={() => handleRevert(row.id)}>
                          Revert
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() =>
                            setDropdownRowId(
                              dropdownRowId === row.id ? null : row.id
                            )
                          }>
                          ✅
                        </button>
                        <button
                          onClick={() =>
                            setCalendarRowId(
                              calendarRowId === row.id ? null : row.id
                            )
                          }>
                          ⏲️
                        </button>
                        <button
                          onClick={() =>
                            setData(
                              data.map((item) =>
                                item.id === row.id
                                  ? { ...item, canceled: true }
                                  : item
                              )
                            )
                          }
                          disabled={row.canceled}>
                          {row.canceled ? "Declined" : "❌"}
                        </button>
                      </>
                    )}
                    {dropdownRowId === row.id && (
                      <div className={styles.dropdown}>
                        <label>Select Time: </label>
                        <select
                          className={styles.dropdownSelect}
                          onChange={(e) => {
                            const selectedTime = e.target.value;
                            if (
                              validateTimeSelection(
                                row.timeSlot,
                                selectedTime,
                                mentorshipDuration
                              )
                            ) {
                              handleSaveTime(row.id, selectedTime);
                            } else {
                              alert(
                                "Invalid time selection. Please select a valid time within the slot."
                              );
                            }
                          }}>
                          {Array.from(
                            { length: endHour - startHour + 1 },
                            (_, i) => {
                              const hour = String(startHour + i).padStart(
                                2,
                                "0"
                              );
                              return [
                                `${hour}:00`,
                                `${hour}:15`,
                                `${hour}:30`,
                                `${hour}:45`,
                              ];
                            }
                          )
                            .flat()
                            .filter((time) => {
                              const [hour] = time.split(":");
                              return (
                                Number(hour) + mentorshipDuration <= endHour
                              );
                            })
                            .map((time) => (
                              <option key={time} value={time}>
                                {time}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}
                    {calendarRowId === row.id && (
                      <div className={styles.calendar}>
                        <label>Select Date: </label>
                        <input
                          type="date"
                          min={todayDate}
                          value={proposedDate}
                          onChange={(e) => setProposedDate(e.target.value)}
                        />
                        <label>Select Start Time: </label>
                        <input
                          type="time"
                          value={proposedStartTime}
                          onChange={(e) => setProposedStartTime(e.target.value)}
                        />
                        <button
                          onClick={() =>
                            handleSaveProposedTime(
                              row.id,
                              proposedDate,
                              proposedStartTime
                            )
                          }
                          disabled={!proposedDate || !proposedStartTime}>
                          Save
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MentorshipTable;
