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
      console.log("user", user);
      set({
        selectedUser: {
          id: user.id || "",
          name: user.displayName || "",
          email: user.email || "",
          phoneNumber: user.phoneNumber || "",
          photoUrl: user.photoUrl || "",
          address: user.address || "",
          password: "", // Never store the password in plain text
        },
        error: null,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Login failed.",
      });
    } finally {
      set({ loading: false });
    }
  },

  clearUser: () => {
    set({ selectedUser: initialUser });
  },
}));
