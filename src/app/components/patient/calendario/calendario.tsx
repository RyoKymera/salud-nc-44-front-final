"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { toast } from "react-toastify";

interface Cita {
  ID_Appointments: number;
  appointmentDatetime: string;
  status: string; // CONFIRMED, PENDING, COMPLETED, CANCELLED
}

export default function CalendarioCitas() {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState<Date>(new Date());

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const res = await fetch("http://localhost:3000/appointments");
        if (!res.ok) throw new Error("Error al obtener citas");
        const data = await res.json();
        setCitas(data);
      } catch (error) {
        console.error(error);
        toast.error("No se pudieron cargar las citas");
      } finally {
        setLoading(false);
      }
    };
    fetchCitas();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-[#1ABC9C] text-lg">Cargando calendario...</p>
      </div>
    );
  }

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const citasDelDia = citas.filter(
        (c) => new Date(c.appointmentDatetime).toDateString() === date.toDateString()
      );

      if (citasDelDia.length === 0) return "";

    
      if (citasDelDia.some((c) => c.status === "CANCELLED")) return "bg-red-500 text-white font-semibold rounded-full";
      if (citasDelDia.some((c) => c.status === "PENDING")) return "bg-yellow-500 text-black font-semibold rounded-full";
      if (citasDelDia.some((c) => c.status === "CONFIRMED")) return "bg-green-500 text-white font-semibold rounded-full";
      if (citasDelDia.some((c) => c.status === "COMPLETED")) return "bg-blue-500 text-white font-semibold rounded-full";
    }
    return "";
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-black mb-6">
        📅 Calendario de Citas
      </h2>

      <Calendar
        onChange={(val) => val instanceof Date && setValue(val)}
        value={value}
        tileClassName={tileClassName}
        className="rounded-xl p-4 
        shadow-lg border border-gray-300"
      />

      <div className="mt-6 w-full max-w-md text-center">
        <p className="mb-2 font-semibold">Fecha seleccionada:</p>
        <p className="text-lg font-medium">
          {value.toLocaleDateString("es-AR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>

        {citas.some(
          (c) => new Date(c.appointmentDatetime).toDateString() === value.toDateString()
        ) && (
          <p className="mt-2 font-semibold">
            ✅ Tienes cita(s) este día
          </p>
        )}
      </div>
    </div>
  );
}
