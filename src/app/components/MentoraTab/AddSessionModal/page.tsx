import { X } from "lucide-react";
import { useState } from "react";
import { useSessionStore } from "@/app/store/sessionStore";
import { Session } from "@/app/constants/types";

const AddSessionModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onAddSession: (session: Session) => void;
}> = ({ isOpen, onClose, onAddSession }) => {
  const { selectedDate, sessionDetails, setSessionDetails } = useSessionStore();

  const [timeError, setTimeError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !sessionDetails.name ||
      !sessionDetails.description ||
      !sessionDetails.time
    ) {
      setTimeError("Please fill in all required fields");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (selectedDate === today) {
      const currentTime = new Date().toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
      });

      if (sessionDetails.time < currentTime) {
        setTimeError("Cannot create a session in the past");
        return;
      }
    }

    const newSession: Session = {
      id: Date.now().toString(),
      date: selectedDate,
      time: sessionDetails.time as string,
      name: sessionDetails.name as string,
      description: sessionDetails.description as string,
      currentParticipants: 0,
      maxParticipants: sessionDetails.maxParticipants
        ? Number(sessionDetails.maxParticipants)
        : 0,
      price: sessionDetails.price ? Number(sessionDetails.price) : 0,
    };

    onAddSession(newSession);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-96 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <X size={24} />
        </button>
        <h2 className="text-xl font-bold mb-4 text-black">
          Create New Session
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Session Name"
            value={sessionDetails.name || ""}
            onChange={(e) => setSessionDetails({ name: e.target.value })}
            className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            required
          />
          <textarea
            placeholder="Description"
            value={sessionDetails.description || ""}
            onChange={(e) => setSessionDetails({ description: e.target.value })}
            className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
            required
          />
          <input
            type="time"
            value={sessionDetails.time || ""}
            onChange={(e) => {
              setSessionDetails({ time: e.target.value });
              setTimeError("");
            }}
            className={`w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 ${
              timeError
                ? "border-red-500 focus:ring-red-500"
                : "focus:ring-red-300"
            }`}
            required
          />
          {timeError && <p className="text-red-500 text-sm">{timeError}</p>}
          <div className="flex space-x-2">
            <input
              type="number"
              placeholder="Max Participants"
              value={sessionDetails.maxParticipants || ""}
              onChange={(e) =>
                setSessionDetails({
                  maxParticipants: parseInt(e.target.value, 10),
                })
              }
              className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={sessionDetails.price || ""}
              onChange={(e) =>
                setSessionDetails({ price: parseFloat(e.target.value) })
              }
              className="w-full p-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-400 text-white p-2 rounded hover:bg-red-500 shadow-md transition-colors duration-300"
          >
            Create Session
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSessionModal;
