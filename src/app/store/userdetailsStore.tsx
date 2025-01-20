import { create } from "zustand";
import { UserData } from "../types";
import axios from "axios";

interface UserDetailsStore {
  selectedUser: UserData;
  setUser: (details: UserData) => void;
  login: (email: string, password: string) => Promise<void>;
  clearUser: () => void;
  error: string | null;
  loading: boolean;
}

const initialUser: UserData = {
  id: "",
  name: "",
  email: "",
  phoneNumber: "",
  password: "",
  photoUrl: "",
  address: "",
};

export const useUserStore = create<UserDetailsStore>((set) => ({
  selectedUser: initialUser,
  error: null,
  loading: false,

  setUser: (details) => {
    set({ selectedUser: details });
  },

  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      const response = await axios.post(
        "http://localhost:3001/api/login/mentor",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const user = response.data.user;
      if (!user) {
        throw new Error("Invalid server response. User data is missing.");
      }

      set({
        selectedUser: {
          id: user.uid || "",
          name: user.displayName || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          photoUrl: user.photoUrl || "",
          address: user.address || "",
          password: "", // Never store passwords in plain text
        },
        error: null,
      });
    } catch (err: unknown) {
      let errorMessage = "An unexpected error occurred.";
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (
        typeof err === "object" &&
        (err as any)?.response?.data?.error
      ) {
        errorMessage = (err as any).response.data.error;
      }

      set({
        error: errorMessage,
      });

      throw new Error(errorMessage); // Ensure the caller is notified of the failure
    } finally {
      set({ loading: false });
    }
  },

  clearUser: () => {
    set({ selectedUser: initialUser });
  },
}));
