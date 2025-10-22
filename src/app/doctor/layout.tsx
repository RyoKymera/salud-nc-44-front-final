"use client";

import { useState, ReactNode } from "react";
import SidebarDoc from "./components/SidebarDoc";
import HeaderDoc from "./components/HeaderDoc";

interface DoctorLayoutProps {
  children: ReactNode;
}

export default function DoctorLayout({ children }: DoctorLayoutProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* SIDEBAR */}
      <SidebarDoc isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* CONTENEDOR PRINCIPAL */}
      <div className={`flex flex-col flex-1 ml-20 md:ml-${isOpen ? '64' : '20'} transition-all duration-300`}>
        <HeaderDoc />
        <main className="p-6 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
