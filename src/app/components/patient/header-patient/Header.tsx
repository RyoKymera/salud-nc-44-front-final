"use client";
import { Bell, TextAlignJustify, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import SidebarPatient from "../sidebar-patient/sidebar-patient";
import CitasPtient from "../quotes-patient/citasPatient";
import CitasCompletadas from "../especialistas/historyPatient";
import { Sidebar } from "lucide-react";
import { useAuthStore } from "@/app/store/authStore";
import TeleconsultaPatientScreen from "../Teleconsultation-patient/TeleconsultationPatient";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("citas");
  const sidebarWidth = 210; 
  const { user } = useAuthStore();

  // Renderizado según opción
  const renderContent = () => {
    switch (activeTab) {
      case "misCitas":
        return <CitasPtient />;
      case "mihistorial":
        return <CitasCompletadas />;
      case "teleconsulta":
        return user ? <TeleconsultaPatientScreen patientId={user.id} /> : null;
      case "clinicoPDF":
        return < Sidebar/>
      default:
        return null;
    }
  };

  return (
    <>
      <header className="flex items-center justify-between w-full h-[55px] border-b border-gray-300 relative">
        <div
          onClick={() => setOpen(!open)}
          className="w-[40px] h-[40px] flex items-center justify-center rounded cursor-pointer hover:bg-[#1ABC9C] transition-all duration-200 absolute top-1/2 -translate-y-1/2 z-50"
          style={{
            left: open ? `${sidebarWidth + 20}px` : "20px", 
          }}
        >
          {open ? (
            <X className="w-[24px] h-[24px] text-gray-700" />
          ) : (
            <TextAlignJustify className="w-[24px] h-[24px] text-gray-700" />
          )}
        </div>

        <SidebarPatient 
          open={open} 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          setOpen={setOpen}
        />

        {/* Icono de notificación + avatar */}
        <div className="flex items-center gap-4 absolute right-[20px] sm:right-[40px] md:right-[60px] h-full">
          <button className="p-2 rounded-full hover:bg-gray-100 transition  cursor-pointer ml-[5px]">
            <Bell className="w-5 h-5 text-gray-700" />
          </button>

          <div className="flex justify-center items-center h-11 w-px bg-gray-300" />
          <p className="text-[16px] font-semibold text-white ">
            <span className="text-[#1ABC9C] font-extralight">Bienvenido,</span>{" "}
            <span className="bg-gradient-to-r from-[#1ABC9C] font-extralight to-[#2ac5a6] bg-clip-text text-transparent ">
              {`${user?.name} ${user?.lastname}`}
            </span>
          </p>
          
          <div
              className={`w-[35px] h-[35px] rounded-full overflow-hidden ml-[25px] border ${
                user?.gender?.toUpperCase() === "MALE" ? "border-blue-600" : "border-pink-500"
              }`}
            >
            <Image
              src={
                user?.gender?.toUpperCase() === "MALE"
                  ? "/varon.webp"
                  : "/mujer.webp"
              }
              alt="User Avatar"
              width={35}
              height={35}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      </header>
      <main className="p-6 mt-[55px]">{renderContent()}</main>
    </>
  );
}
