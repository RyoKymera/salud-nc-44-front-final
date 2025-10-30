"use client";
import { Calendar, Stethoscope, Video ,Download} from "lucide-react";
import LogoutButton from "../../logoutButton";
import {toast,ToastContainer } from "react-toastify";
import {CircleAlert} from "lucide-react"

interface SidebarPatientProps {
  open: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  setOpen: (open: boolean) => void;
}


//  Función para descargar historial clínico
 const handleDownload = async () => {
  try {
    const token = localStorage.getItem("token");
    console.log("Token JWT:", token);

    if (!token) throw new Error("No hay token de usuario, inicie sesión");

    const response = await fetch("http://localhost:3000/records/patient/download", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      credentials: "include", 
    });

      
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error response body:", errorText);
      throw new Error("Error al descargar el historial clínico");
    }


    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "historial_clinico.pdf";
    link.click();
    window.URL.revokeObjectURL(url);
  } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error al descargar su Historial clinico";
     
      toast.error( message, {
        icon: <CircleAlert color="#FAFAFA" size={20} />,
        style: { background: "#E74C3C", color: "#FAFAFA" },
      });
    }
};



export default function SidebarPatient({ open,setActiveTab,setOpen }: SidebarPatientProps) {
  return (
    <>
      
      {open && (
        <div
          className="fixed inset- z-40 transition-opacity duration-300"
        />
      )}

      {/* Drawer lateral */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[210px] text-white bg-[#0B1E4E] backdrop-blur-lg border-r border-gray-700 z-30 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Menú */}
        <div className="flex items-center justify-centelex p-4 ">
          <Stethoscope className="w-6 h-6 text-[#1ABC9C]" />
          <h2 className="ml-[15px] text-2xl font-semibold text-white">Menú</h2>
        </div>

        <ul className="pt-5 space-y-3 mt-[15px]">
          <li 
            className="mx-4 flex items-center gap-2 cursor-pointer hover:bg-[#1ABC9C] transition-all p-3 rounded-md"
            onClick={() => {setActiveTab("misCitas");setOpen(false);}}
            >
            <Calendar className="w-5 h-5 text-gray-300" />
            Mis citas
          </li>
         <li 
            className="mx-4 flex items-center gap-2 cursor-pointer hover:bg-[#1ABC9C] transition-all p-3 rounded-md"
            onClick={handleDownload} 
          >
            <Download className="w-5 h-5 text-gray-300" />
            Historial clínico
          </li>
          <li 
            className="mx-4 flex items-center gap-2 cursor-pointer hover:bg-[#1ABC9C] transition-all p-3 rounded-md"
            onClick={()=>{setActiveTab("mihistorial");setOpen(false)}}
          >
            <Stethoscope className="w-5 h-5 text-gray-300" />
            Especialistas
          </li>
          <li 
              className="mx-4 flex items-center gap-2 cursor-pointer hover:bg-[#1ABC9C] transition-all p-3 rounded-md"
              onClick={() => {setActiveTab("teleconsulta"); setOpen(false);}}
            >
              <Video className="w-5 h-5 text-gray-300" />
              Teleconsulta
            </li>
        </ul>
        <div className="absolute bottom-5 mx-4  gap-2 cursor-pointer hover:bg-[#1ABC9C] transition-all p-3 rounded-md">
          <LogoutButton/>
        
        </div>
        
      </aside>
      <ToastContainer position="top-right" autoClose={2000} limit={2} />
    </>
  );
}
