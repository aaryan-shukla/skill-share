import { create } from "zustand";
import { UserData } from "../types";

interface UserDetailsStore {
  selectedUser: UserData;
  setUser: (details: UserData) => void;
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

  setUser: (details) => {
    set({ selectedUser: details });
  },
}));
