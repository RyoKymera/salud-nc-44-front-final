"use client";
import { sidebarItems } from "./sidebarItems";
import { HiMiniArrowLeftOnRectangle } from "react-icons/hi2";

interface SidebarDocProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function SidebarDoc({ isOpen, setIsOpen }: SidebarDocProps) {
  const isCollapsed = !isOpen;

  return (
    <aside
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      className={`h-screen bg-primary text-white shadow-md flex flex-col transition-all duration-300
      ${isCollapsed ? "w-20" : "w-64"} fixed`}
    >
      {/* CONTENEDOR MENÚ */}
      <nav className="flex-1 mt-6 space-y-1">
        {sidebarItems.slice(0, -1).map((item, index) => (
          <button
            key={index}
            className={`flex items-center gap-4 w-full px-5 py-3 text-sm hover:bg-primary/80 transition
            ${isCollapsed ? "justify-center px-0" : ""}`}
          >
            <item.icon size={22} />
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* LOGOUT */}
      <div className="border-t border-white/20">
        <button
          className={`flex items-center gap-4 w-full px-5 py-3 text-sm hover:bg-red-600 transition
          ${isCollapsed ? "justify-center px-0" : ""}`}
        >
          <HiMiniArrowLeftOnRectangle size={22} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
