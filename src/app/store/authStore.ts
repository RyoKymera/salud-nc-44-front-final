import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id:number
  dni: string;
  role: "ADMIN" | "MEDIC" | "PATIENT";
  name: string;
  lastname: string;
  gender: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  refreshToken: () => Promise<string | null>;
}

const ApiUrl = process.env.NEXT_PUBLIC_API_URL;

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      user: null,
      token: null,
      login: (user, token) => set({ user, token }),
      logout: () => {
        set({ user: null, token: null });
        localStorage.removeItem("token");
        localStorage.removeItem("auth-storage");
      },
      refreshToken: async () => {
        try {
          const res = await fetch(`${ApiUrl}/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include", 
          });

          if (!res.ok) throw new Error("No se pudo refrescar el token");

          const data = await res.json();
          set({ token: data.accessToken, user: data.user });
          localStorage.setItem("token", data.accessToken);
          return data.accessToken;
        } catch (err: unknown) {
          if (err instanceof Error) {
            console.log(err.message); 
          }else {
            console.log("Error desconocido:", err);}
        }
      },
    }),
    {
      name: "auth-storage", 
    }
    
  )
 
);
