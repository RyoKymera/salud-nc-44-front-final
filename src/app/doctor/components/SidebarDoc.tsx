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
      className={`fixed left-0 top-0 h-screen bg-primary text-white shadow-md flex flex-col transition-all duration-300 z-20
      ${isCollapsed ? "w-20" : "w-64"}`}
    >
      <nav className="flex-1 mt-6 space-y-1 px-2">
        {sidebarItems.slice(0, -1).map((item, index) => (
          <button
            key={index}
            className={`flex items-center gap-4 w-full px-4 py-3 text-sm rounded-md transition-all
            hover:bg-secondary hover:shadow-md hover:shadow-secondary/30
            ${isCollapsed ? "justify-center px-0" : "justify-start"}`}
          >
            <item.icon size={22} />
            {!isCollapsed && <span>{item.label}</span>}
          </button>
        ))}
      </nav>

      {/* LOGOUT */}
      <div className="border-t border-white/20 px-2 mb-4">
        <button
          className={`flex items-center gap-4 w-full px-4 py-3 text-sm rounded-md transition-all
          hover:bg-red-600 hover:shadow-md hover:shadow-red-600/30
          ${isCollapsed ? "justify-center px-0" : "justify-start"}`}
        >
          <HiMiniArrowLeftOnRectangle size={22} />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
