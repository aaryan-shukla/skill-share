import React, { useState } from "react";
import { UserPlus, Trash2, Check, X } from "lucide-react";
import Session from "@/app/constants/types";

const TimeSlots: React.FC<{
  selectedDate: string;
  sessions: Session[];
  onDeleteSession: (sessionId: string) => void;
}> = ({ selectedDate, sessions, onDeleteSession }) => {
  const [confirmingDelete, setConfirmingDelete] = useState<string | null>(null);

  const handleDeleteConfirmation = (sessionId: string) => {
    if (confirmingDelete === sessionId) {
      onDeleteSession(sessionId);
      setConfirmingDelete(null);
    } else {
      setConfirmingDelete(sessionId);
    }
  };

  const cancelDeletion = () => {
    setConfirmingDelete(null);
  };

  const createdSessionTimes = Array.from(
    new Set(
      sessions
        .filter((session) => session.date === selectedDate)
        .map((session) => session.time.slice(0, 5))
    )
  );

  if (createdSessionTimes.length === 0) {
    return (
      <div className="flex justify-center items-center p-8 text-gray-500">
        <UserPlus className="mr-2" />
        <span>No sessions created for this date</span>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      {createdSessionTimes.map((time, index) => {
        const slotSessions = sessions.filter(
          (session) =>
            session.date === selectedDate && session.time.startsWith(time)
        );

        return (
          <div key={index} className="flex items-center border-b pb-4">
            <div className="w-20 text-gray-600 mr-4">{time}</div>

            <div className="w-full overflow-x-auto">
              <div className="flex space-x-4 pb-2">
                {slotSessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex-shrink-0 bg-gray-100 text-black shadow-md rounded-lg p-4 w-64 relative group"
                  >
                    {confirmingDelete === session.id ? (
                      <div className="absolute inset-0 bg-red-100 bg-opacity-90 flex items-center justify-center z-10 rounded-lg">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleDeleteConfirmation(session.id)}
                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                          >
                            <Check size={20} />
                          </button>
                          <button
                            onClick={cancelDeletion}
                            className="bg-gray-300 text-black p-2 rounded-full hover:bg-gray-400 transition"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleDeleteConfirmation(session.id)}
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={20} />
                      </button>
                    )}
                    <h3 className="font-bold text-lg mb-1">{session.name}</h3>
                    <p className="text-black text-sm mb-2">
                      {session.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <UserPlus size={16} className="text-black" />
                        <span>
                          {session.currentParticipants}/
                          {session.maxParticipants}
                        </span>
                      </div>
                      <span className="text-black font-semibold">
                        ${session.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TimeSlots;
