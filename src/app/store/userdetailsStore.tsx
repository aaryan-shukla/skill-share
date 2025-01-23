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
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : initialUser;
  }
  return initialUser;
};

export const useUserStore = create<UserDetailsStore>((set) => ({
  selectedUser: typeof window === "undefined" ? initialUser : getStoredUser(),
  error: null,
  loading: false,

  setUser: (details) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(details));
    }
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
      const errorMessage =
        axios.isAxiosError(err) && err.response?.data?.error
          ? err.response.data.error
          : err instanceof Error
          ? err.message
          : "An unexpected error occurred.";
      console.error("Login error:", err);

      set({ error: errorMessage });
      throw new Error(errorMessage);
    } finally {
      set({ loading: false });
    }
  },

  clearUser: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    set({ selectedUser: initialUser });
  },
}));
