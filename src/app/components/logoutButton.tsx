"use client";
import { useRouter } from "next/navigation";
import {toast} from "react-toastify"
import {LogOut,CircleAlert} from  "lucide-react"
import { useAuthStore } from "@/app/store/authStore"; 

export default function LogoutButton() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const API_URL = process.env.NEXT_PUBLIC_API_URL; 

      if (token) {
       
        await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
          credentials: "include",
        });
      }
      //store
      logout();
      
      toast.success("Sesión cerrada correctamente");
    

      setTimeout(() => router.push("/"), 1000);

    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "No se pudo cerrar sesión correctamente";
     
      toast.error(message, {
        icon: <CircleAlert color="#FAFAFA" size={20} />,
        style: { background: "#E74C3C", color: "#FAFAFA" },
      });
    }

  };

  return (
    <button
      onClick={handleLogout}
      className="flex w-[160px] px-[20px] justify-between items-center cursor-pointer">

     <LogOut className="w-[15px]"/> Salir
    </button>
  );
}
