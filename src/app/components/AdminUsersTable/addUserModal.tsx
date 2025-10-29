"use client";

import type React from "react";
import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { useAuthStore } from "../../store/authStore"; 
import { GenderFormData, UserFormData, UserRoleFormData } from "@/app/types/User";



export function AddUserModal({
  open,
  onOpenChange,
  onUserCreated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUserCreated?: () => void;
}) {
 
  const [userType, setUserType] = useState<UserRoleFormData>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    password: "",
    name: "",
    lastname: "",
    dni: "",
    userType: "",
    gender: "",
    birthdate: "",
    specialty: "",
    schedule: "",
    phone_number: "",
    address: "",
  });

  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const { token } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {

      if (!token) {
        throw new Error("No se encontró token de autenticación");
      }

      const submitData: {
        userType: UserRoleFormData;
        DNI: string;
        Name: string;
        Lastname: string;
        Email: string;
        password: string;
        gender?: GenderFormData;
        Birthdate?: string;
        specialty?: string;
        schedule?: string;
        phone_number?: string;
        address?: string;
      } = {
        userType: userType,
        DNI: formData.dni,
        Name: formData.name,
        Lastname: formData.lastname,
        Email: formData.email,
        password: formData.password,
      };

      if (userType === "MEDIC" || userType === "PATIENT") {
        submitData.gender = formData.gender;
        submitData.Birthdate = formData.birthdate;
      }

      if (userType === "MEDIC") {
        submitData.specialty = formData.specialty;
        submitData.schedule = formData.schedule;
      }

      if (userType === "PATIENT") {
        submitData.phone_number = formData.phone_number;
        submitData.address = formData.address;
      }

      console.log({ submitData, token });

      const response = await fetch(`${base_url}/admin/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(submitData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Error data:", errorData);
        throw new Error(errorData.message || "Error al crear usuario");
      }

      await response.json();
      handleCancel();
      if (onUserCreated) {
        onUserCreated();
      }
      alert("Usuario creado exitosamente");
    } catch (err) {
      console.error("Error al crear usuario:", err);
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setUserType("");
    setError("");
    setFormData({
      email: "",
      password: "",
      name: "",
      lastname: "",
      dni: "",
      userType: "",
      gender: "",
      birthdate: "",
      specialty: "",
      schedule: "",
      phone_number: "",
      address: "",
    });
    onOpenChange(false);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={handleCancel} />

      <div className="relative z-50 w-full max-w-[520px] max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <button
            onClick={handleCancel}
            className="absolute right-4 top-4 rounded-sm opacity-70 hover:opacity-100 transition-opacity"
          >
            <X className="h-4 w-4 text-black" />
            <span className="sr-only">Cerrar</span>
          </button>
          <h2 className="text-xl font-semibold text-gray-900">
            Agregar Nuevo Usuario
            
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Completa los datos para registrar un nuevo usuario en el sistema
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Nombre Completo *
            </label>
            <input
              id="name"
              type="text"
              placeholder="Nombre completo del usuario"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="lastname"
              className="text-sm font-medium text-gray-700"
            >
              Apellido *
            </label>
            <input
              id="lastname"
              type="text"
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Correo Electrónico *
            </label>
            <input
              id="email"
              type="email"
              placeholder="usuario@ejemplo.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* DNI */}
          <div className="space-y-2">
            <label htmlFor="dni" className="text-sm font-medium text-gray-700">
              DNI / Documento *
            </label>
            <input
              id="dni"
              type="text"
              placeholder="12345678A"
              value={formData.dni}
              onChange={(e) =>
                setFormData({ ...formData, dni: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Contraseña */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Contraseña Temporal *
            </label>
            <input
              id="password"
              type="password"
              placeholder="Ingresa contraseña temporal"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>

          {/* Tipo de Usuario */}
          <div className="space-y-2">
            <label
              htmlFor="userType"
              className="text-sm font-medium text-gray-700"
            >
              Tipo de Usuario *
            </label>
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value as UserRoleFormData)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            >
              <option value="">Selecciona un tipo</option>
              <option value="ADMIN">Administrador</option>
              <option value="MEDIC">Médico</option>
              <option value="PATIENT">Paciente</option>
            </select>
          </div>

          {/* Género y Fecha de Nacimiento (para médicos y pacientes) */}
          {(userType === "MEDIC" || userType === "PATIENT") && (
            <>
              <div className="space-y-2">
                <label
                  htmlFor="gender"
                  className="text-sm font-medium text-gray-700"
                >
                  Género *
                </label>
                <select
                  id="gender"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      gender: e.target.value as GenderFormData,
                    })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                >
                  <option value="">Seleccionar género</option>
                  <option value="MALE">Masculino</option>
                  <option value="FEMALE">Femenino</option>
                  <option value="OTHER">Otro</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="birthdate"
                  className="text-sm font-medium text-gray-700"
                >
                  Fecha de Nacimiento *
                </label>
                <input
                  id="birthdate"
                  type="date"
                  value={formData.birthdate}
                  onChange={(e) =>
                    setFormData({ ...formData, birthdate: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </>
          )}

          {/* Campos específicos para médicos */}
          {userType === "MEDIC" && (
            <>
              <div className="space-y-2">
                <label
                  htmlFor="specialty"
                  className="text-sm font-medium text-gray-700"
                >
                  Especialidad *
                </label>
                <input
                  id="specialty"
                  type="text"
                  value={formData.specialty}
                  onChange={(e) =>
                    setFormData({ ...formData, specialty: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="schedule"
                  className="text-sm font-medium text-gray-700"
                >
                  Horario *
                </label>
                <input
                  id="schedule"
                  type="text"
                  placeholder="Ej: Lunes a Viernes 8:00-16:00"
                  value={formData.schedule}
                  onChange={(e) =>
                    setFormData({ ...formData, schedule: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </>
          )}

          {/* Campos específicos para pacientes */}
          {userType === "PATIENT" && (
            <>
              <div className="space-y-2">
                <label
                  htmlFor="phone_number"
                  className="text-sm font-medium text-gray-700"
                >
                  Teléfono *
                </label>
                <input
                  id="phone_number"
                  type="tel"
                  value={formData.phone_number}
                  onChange={(e) =>
                    setFormData({ ...formData, phone_number: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="address"
                  className="text-sm font-medium text-gray-700"
                >
                  Dirección *
                </label>
                <input
                  id="address"
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                />
              </div>
            </>
          )}

          {/* Botones */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={!userType || isLoading}
              className="flex-1 px-4 py-2 rounded-md text-white bg-teal-500 hover:bg-teal-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
              {isLoading ? "Creando..." : "Crear Usuario"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
