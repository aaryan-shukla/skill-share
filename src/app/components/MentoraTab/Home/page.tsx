"use client";

import React, { useState } from "react";
import { Search, Plus } from "lucide-react";
import { Session } from "@/app/types";
import DateCarousel from "../DateCarousel/page";
import TimeSlots from "../TimeSlots/page";
import AddSessionModal from "../AddSessionModal/page";

const MentorHome: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddSession = (newSession: Session) => {
    setSessions([...sessions, newSession]);
  };

  const filteredSessions = sessions.filter(
    (session) =>
      session.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      session.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteSession = (sessionId: string) => {
    setSessions((prevSessions) =>
      prevSessions.filter((session) => session.id !== sessionId)
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Sessions</h1>
        <p className="text-gray-600 mt-2">
          Manage and create your mentoring sessions with ease
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex items-center p-4 space-x-4 border-b">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search sessions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-1/3 p-2 pl-10 border shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            />
            <Search className="absolute left-3 top-3 text-gray-400" />
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-red-400 text-white px-4 py-1.5 rounded-lg flex items-center space-x-2 hover:bg-red-500 shadow-md"
          >
            <Plus size={20} />
            <span>Add Session</span>
          </button>
        </div>

        <DateCarousel
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />

        <TimeSlots
          selectedDate={selectedDate}
          sessions={filteredSessions}
          onDeleteSession={handleDeleteSession}
        />
      </div>

      <AddSessionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddSession={handleAddSession}
        selectedDate={selectedDate}
      />
    </div>
  );
};

export default MentorHome;
