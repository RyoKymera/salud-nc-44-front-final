"use client";
import { useRouter } from "next/navigation";
import {toast} from "react-toastify"
import {LogOut} from  "lucide-react"

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      const API_URL = process.env.NEXT_PUBLIC_API_URL; 

      if (token) {
       
        await fetch(`${API_URL}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, //ver si lo requiere
          },
        });
      }

      localStorage.removeItem("token");
      toast.success("Sesión cerrada correctamente");
      router.push("/");

    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error("No se pudo cerrar sesión correctamente");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="absolute top-4 right-7 flex justify-between text-[#0F2550]
                 w-[82px] sm:w-[95px] 
                 px-3 py-2
                 bg-white/20 backdrop-blur-md border-l-3 border-[#1ABC9C]
                 font-medium rounded-md
                 hover:bg-[#1ABC9C] hover:border-[#1ABC9C]
                 active:scale-95 transition-all duration-200 cursor-pointer"
    >

     <LogOut className="w-[15px]"/> Salir
    </button>
  );
}
