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
const getStoredUser = (): UserData => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : initialUser;
};
export const useUserStore = create<UserDetailsStore>((set) => ({
  selectedUser: getStoredUser(),
  error: null,
  loading: false,

  setUser: (details) => {
    localStorage.setItem("user", JSON.stringify(details));
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
      console.log("user", response);
      if (!user) {
        throw new Error("Invalid server response. User data is missing.");
      }

      set({
        selectedUser: {
          id: user.uid || "",
          name: user.name || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          photoUrl: user.photoUrl || "",
          address: user.address || "",
          password: "",
        },
        error: null,
      });
      localStorage.setItem("user", JSON.stringify(user));
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

      throw new Error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },

  clearUser: () => {
    localStorage.removeItem("user");
    set({ selectedUser: initialUser });
  },
}));
