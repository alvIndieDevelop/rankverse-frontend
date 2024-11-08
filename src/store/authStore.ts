import { create } from "zustand";
import { Role } from "../types/tournament";

interface User {
  id: string;
  username: string;
  elo: number;
  role: Role;
}

interface AuthState {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, role: Role) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: async (username, password) => {
    // Simulate API call
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      elo: 1200,
      role: "player" as Role,
    };
    set({ user });
  },
  register: async (username, password, role) => {
    // Simulate API call
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      username,
      elo: 1200,
      role,
    };
    set({ user });
  },
  logout: () => set({ user: null }),
}));
