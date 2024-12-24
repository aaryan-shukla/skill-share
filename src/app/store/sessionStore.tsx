import { create } from "zustand";
import { Session } from "../types";

interface SessionStore {
  selectedDate: string;
  sessionDetails: Partial<Session>;

  setSelectedDate: (date: string) => void;
  setSessionDetails: (details: Partial<Session>) => void;
  resetSessionDetails: () => void;
}

const initialSessionDetails: Partial<Session> = {
  name: "",
  description: "",
  time: "",
  maxParticipants: 0,
  price: 0,
};

export const useSessionStore = create<SessionStore>((set) => ({
  selectedDate: new Date().toISOString().split("T")[0],
  sessionDetails: initialSessionDetails,

  setSelectedDate: (date) => {
    set({ selectedDate: date });
  },

  setSessionDetails: (details) => {
    set((state) => ({
      sessionDetails: { ...state.sessionDetails, ...details },
    }));
  },

  resetSessionDetails: () => {
    set({ sessionDetails: initialSessionDetails });
  },
}));
