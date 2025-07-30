import { create } from "zustand";
import { UserData } from "@/lib/types/auth";

interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
  isLoading: boolean;
  setState: (partial: Partial<AuthState>) => void;
  error: string | null;
}

export const useAuthStore = create<AuthState>((s) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  setState: (partial) => s(partial),
  error: null,
}));
