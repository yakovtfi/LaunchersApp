import { create } from 'zustand';
import { useEffect } from "react";
import type { User } from '../types/user';
import type { ReactNode } from 'react';
import api from '../api/axios';




interface UserStore {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  init: () => Promise<void>;
}

const normalizeUser = (raw: any): User => ({
  _id: raw.id ?? raw._id,
  username: raw.username,
  email: raw.email,
  type_user: raw.type_user ?? raw.user_type,
  last_login: raw.last_login,
});

const useAuthStore = create<UserStore>((set, get) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: true,

  login: async (email: string, password: string) => {
    const { data } = await api.post("/auth/login", {
      email,
      username: email,
      password,
    });

    
    console.log('login response:', data);

    localStorage.setItem("token", data.token);

    set({
      token: data.token,
      user: normalizeUser(data.user),
      loading: false,
    });

    return normalizeUser(data.user);
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },

  init: async () => {
    const { token } = get();

    if (!token) {
      set({ loading: false });
      return;
    }

    try {
      const { data } = await api.get("/auth/me");

      set({
        user: normalizeUser(data),
        loading: false
      });

    } catch (err) {
      localStorage.removeItem("token");

      set({
        user: null,
        token: null,
        loading: false
      });
    }
  },
}));

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const init = useAuthStore((state) => state.init);

  useEffect(() => {
    init();
  }, [init]);

  return <>{children}</>;
};

export const useAuth = () => useAuthStore();