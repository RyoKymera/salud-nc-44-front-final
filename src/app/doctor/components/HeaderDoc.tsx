import { HiMagnifyingGlass, HiOutlineBell } from "react-icons/hi2";

export default function HeaderDoc() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm w-full fixed top-0 left-0 right-0 z-30">
      {/* LOGO */}
      <div className="w-40 font-semibold text-primary ml-10 md:ml-10 transition-all duration-300">
        LOGO
      </div>

      {/* Search bar */}
      <div className="flex items-center space-x-2 flex-1 max-w-lg bg-gray-100 rounded-lg px-3 py-2 ml-6">
        <HiMagnifyingGlass className="text-gray-500" />
        <input
          placeholder="Buscar pacientes, citas..."
          className="bg-transparent flex-1 outline-none text-sm"
        />
      </div>

      {/* Notificaciones + Perfil */}
      <div className="flex items-center space-x-6 ml-6">
        <button className="relative text-gray-700 hover:text-primary transition">
          <HiOutlineBell size={22} />
          <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-1">
            3
          </span>
        </button>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm text-primary font-semibold">
            DG
          </div>
          <span className="text-sm font-medium text-gray-700">Dr. García</span>
        </div>
      </div>
    </header>
  );
}
