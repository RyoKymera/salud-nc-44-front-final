"use client";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { useState } from "react";
import { Plus, MoreVertical, ChevronDown } from "lucide-react";
import { AddUserModal } from "./addUserModal";
import { mockUsers } from "@/app/mocks/mockUsers";
import { User } from "@/app/types/User";


export function AdminUsersTable() {
  const [users] = useState<User[]>(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [isRoleSelectOpen, setIsRoleSelectOpen] = useState(false);
  const [openActionMenuId, setOpenActionMenuId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  
  const handleUserCreated = () => {
    
    setModalOpen(false);
    
    //ToDo: refresh de lista de usuarios
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const getRoleLabel = (value: string) => {
    switch (value) {
      case "all":
        return "Todos los roles";
      case "Médico":
        return "Médico";
      case "Paciente":
        return "Paciente";
      default:
        return "Todos los roles";
    }
  };

  return (
    <div
      className={`${inter.className} w-[90%] bg-white rounded-3xl border border-gray-200  text-black p-8`}
    >
      <div className="mx-auto ">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-md font-normal  ">Gestión de Usuarios</h1>
            <p className="mt-1 text-sm text-gray-600">
              Administra médicos, pacientes y personal
            </p>
          </div>
          <button
            className="inline-flex items-center justify-center rounded-md bg-tourquoise  px-4 py-2 text-sm font-medium text-white shadow hover:bg-teal-700 focus:outline-none focus:ring-2 "
            onClick={() => setModalOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Nuevo Usuario
          </button>
        </div>

        <div className="mb-6 flex items-center  gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por nombre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex h-10 w-full max-w-md rounded-md border border-input px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <div className="relative">
            <button
              onClick={() => setIsRoleSelectOpen(!isRoleSelectOpen)}
              className="flex h-10 w-[180px] items-center justify-between  rounded-md border border-input  px-3 py-2 
              text-sm ring-offset-background placeholder:text-muted-foreground  
              disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>{getRoleLabel(roleFilter)}</span>
              <ChevronDown className="h-4 w-4 opacity-50" />
            </button>
            {isRoleSelectOpen && (
              <div className="absolute z-50 mt-1 w-full rounded-md border border-border bg-white shadow-md">
                <div className="p-1">
                  <button
                    onClick={() => {
                      setRoleFilter("all");
                      setIsRoleSelectOpen(false);
                    }}
                    className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    Todos los roles
                  </button>
                  <button
                    onClick={() => {
                      setRoleFilter("Médico");
                      setIsRoleSelectOpen(false);
                    }}
                    className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    Médico
                  </button>
                  <button
                    onClick={() => {
                      setRoleFilter("Paciente");
                      setIsRoleSelectOpen(false);
                    }}
                    className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    Paciente
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="rounded-lg border border-gray-300 bg-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-300 bg-gray-100">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground ">
                    Nombre
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                    Rol
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                    Especialidad
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                    Citas
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-muted-foreground">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-gray-300 last:border-0 hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm">{user.name}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.role === "Médico"
                            ? "bg-cyan-100 text-cyan-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm ">
                      {user.specialty || "-"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          user.status === "activo"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm ">{user.appointments}</td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <button
                          onClick={() =>
                            setOpenActionMenuId(
                              openActionMenuId === user.id ? null : user.id
                            )
                          }
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 transition-colors"
                        >
                          <MoreVertical className="h-4 w-4" />
                          <span className="sr-only">Abrir menú</span>
                        </button>
                        {openActionMenuId === user.id && (
                          <div className="absolute right-0 z-50 mt-1 w-48 rounded-md border border-border bg-white shadow-md">
                            <div className="p-1">
                              <button
                                onClick={() => setOpenActionMenuId(null)}
                                className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                Ver detalles
                              </button>
                              <button
                                onClick={() => setOpenActionMenuId(null)}
                                className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                Editar
                              </button>
                              <button
                                onClick={() => setOpenActionMenuId(null)}
                                className="relative flex w-full cursor-pointer text-red-500 select-none items-center rounded-sm px-2 py-1.5 text-sm text-destructive outline-none hover:bg-accent hover:text-destructive focus:bg-accent focus:text-destructive"
                              >
                                Eliminar
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <AddUserModal open={modalOpen} onOpenChange={setModalOpen} onUserCreated={handleUserCreated} />

        {filteredUsers.length === 0 && (
          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              No se encontraron usuarios
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
