"use client";

import { X, CircleCheck, CircleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/app/store/authStore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface FormModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

interface Medic {
  ID_medics: number;
  Name: string;
  Lastname: string;
  specialty: string;
}

export default function FormModalCitaPaciente({ onClose, onSuccess }: FormModalProps) {
  const [medics, setMedics] = useState<Medic[]>([]);
  const [selectedMedic, setSelectedMedic] = useState<number | null>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");
  const { user } = useAuthStore();

  useEffect(() => {
    const fetchMedics = async () => {
      try {
        const res = await fetch("http://localhost:3000/medics");
        if (!res.ok) throw new Error("Error al obtener médicos");
        const data = await res.json();
        setMedics(Array.isArray(data) ? data : []);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Error desconocido";
        toast.error(message, {
          icon: <CircleAlert color="#FAFAFA" size={20} />,
          style: { background: "#E74C3C", color: "#FAFAFA" },
        });
        setMedics([]);
      }
    };
    fetchMedics();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedMedic) return alert("Selecciona un médico");

    const form = e.currentTarget;
    const appointmentDate = (form.elements.namedItem("date") as HTMLInputElement).value;
    const appointmentTime = (form.elements.namedItem("time") as HTMLInputElement).value;

    const formData = {
      ID_Patients: user?.id,
      ID_medics: selectedMedic,
      appointmentType: selectedSpecialty,
      appointmentDatetime: `${appointmentDate}T${appointmentTime}:00.000Z`,
      status: "PENDING",
      notes: (form.elements.namedItem("notes") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("http://localhost:3000/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error al crear la cita");

      // Toast después de la confirmación exitosa
      toast.success("Cita creada correctamente", {
        icon: <CircleCheck color="#FFFFFF" size={20} />,
        style: {
          background: "#10B948",
          color: "#FFFFFF",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        },
      });

      onClose();
      onSuccess();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Error al crear la cita";
     
      toast.error( message, {
        icon: <CircleAlert color="#FAFAFA" size={20} />,
        style: { background: "#E74C3C", color: "#FAFAFA" },
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      
      <div className="bg-white/10 border border-white/20 backdrop-blur-xl p-6 rounded-2xl w-[90%] sm:w-[450px] md:w-[500px] lg:w-[600px] xl:w-[700px] shadow-lg relative text-white">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-[#1ABC9C] transition-all cursor-pointer"
        >
          <X size={22} />
        </button>

        <h2 className="text-xl font-semibold mb-4 text-center">Agende su cita Médica</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col text-sm">
            Especialidad
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="mt-1 rounded p-2 text-black bg-white/10 border border-white/20 focus:border-[#1ABC9C] outline-none cursor-pointer"
            >
              <option value="">Selecciona especialidad</option>
              {Array.from(new Set(medics.map((m) => m.specialty))).map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col text-sm">
            Médico
            <select
              value={selectedMedic ?? ""}
              onChange={(e) => setSelectedMedic(Number(e.target.value))}
              className="mt-1 rounded p-2 text-black bg-white/10 border border-white/20 focus:border-[#1ABC9C] outline-none cursor-pointer"
            >
              <option value="">Selecciona médico</option>
              {medics
                .filter((m) => m.specialty === selectedSpecialty)
                .map((m) => (
                  <option key={m.ID_medics} value={m.ID_medics}>
                    {m.Name} {m.Lastname}
                  </option>
                ))}
            </select>
          </label>

          <label className="flex flex-col text-sm">
            Fecha
            <input
              type="date"
              name="date"
              required
              className="mt-1 rounded p-2 bg-white/10 border border-white/20 focus:border-[#1ABC9C] outline-none cursor-pointer"
            />
          </label>

          <label className="flex flex-col text-sm">
            Hora
            <input
              type="time"
              name="time"
              required
              className="mt-1 rounded p-2 bg-white/10 border border-white/20 focus:border-[#1ABC9C] outline-none cursor-pointer"
            />
          </label>

          <label className="flex flex-col text-sm">
            Motivo de consulta
            <textarea
              name="notes"
              placeholder="Describa brevemente el motivo..."
              className="mt-1 rounded p-2 bg-white/10 border border-white/20 focus:border-[#1ABC9C] outline-none resize-none h-20 placeholder:text-white/60 cursor-pointer"
            />
          </label>

          <div className="flex justify-between mt-4">
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
              Solicitar Cita
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
