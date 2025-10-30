"use client";

import { useState } from "react";
import { X,CircleAlert,CircleCheck } from "lucide-react";
import { toast } from "react-toastify";

interface UpdateModalProps {
  appointmentId: number;
  initialDate: string;
  initialTime: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function FormModalModificarCita({
  appointmentId,
  initialDate,
  initialTime,
  onClose,
  onSuccess,
}: UpdateModalProps) {
  const [date, setDate] = useState(initialDate);
  const [time, setTime] = useState(initialTime);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const datetimeISO = new Date(`${date}T${time}`).toISOString();
      const res = await fetch(`http://localhost:3000/appointments/${appointmentId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentDatetime: datetimeISO }),
      });

      if (!res.ok) throw new Error("Error al actualizar la cita");

      toast.success("Cita actualizada correctamente", {
      icon: <CircleCheck color="#FFFFFF" size={20} />,
      style: { 
        background: "#10B948", 
        color: "#FFFFFF",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)" 
      },
    });
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "No se pudo actualizar la cita";
     
      toast.error( message, {
        icon: <CircleAlert color="#FAFAFA" size={20} />,
        style: { background: "#E74C3C", color: "#FAFAFA" },
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white/10 border border-white/20 backdrop-blur-xl p-6 rounded-2xl w-[90%] sm:w-[400px] shadow-lg relative text-white">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-[#1ABC9C] transition-all cursor-pointer"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Modificar Cita</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col text-sm">
            Fecha
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-1 rounded p-2 bg-white/10 border border-white/20 focus:border-[#1ABC9C] outline-none cursor-pointer"
            />
          </label>

          <label className="flex flex-col text-sm">
            Hora
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="mt-1 rounded p-2 bg-white/10 border border-white/20 focus:border-[#1ABC9C] outline-none cursor-pointer"
            />
          </label>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-500/60 hover:bg-gray-600 transition-all shadow-sm cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-[#1ABC9C] hover:bg-[#2ac5a6] transition-all shadow-md cursor-pointer"
            >
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
