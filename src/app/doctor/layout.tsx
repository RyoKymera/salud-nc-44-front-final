"use client";

import { useState, ReactNode } from "react";
import SidebarDoc from "./components/SidebarDoc";
import HeaderDoc from "./components/HeaderDoc";

interface DoctorLayoutProps {
  children: ReactNode;
}

export default function DoctorLayout({ children }: DoctorLayoutProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex bg-color-background-app text-color-dark h-screen overflow-hidden">
      {/* SIDEBAR */}
      <SidebarDoc isOpen={isOpen} setIsOpen={setIsOpen} />
      
      {/* CONTENIDO */}
      <div className="flex flex-col flex-1 ml-20 md:ml-64 transition-all duration-300">
        <HeaderDoc />
        <main className="p-6 overflow-y-auto mt-16 h-full">
          {children}
        </main>
      </div>
    </div>
  );
}
