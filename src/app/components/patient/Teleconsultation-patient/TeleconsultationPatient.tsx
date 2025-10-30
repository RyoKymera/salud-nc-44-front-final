"use client";

import { useEffect, useState } from "react";
import {
  getActiveTeleconsultation,
  joinTeleconsultation,
} from "@/app/services/teleconsultationService";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CircleAlert } from "lucide-react";


interface Teleconsulta {
  id: number;
  medicName: string;
  scheduledDate: string;
  roomId?: string;
}

interface TeleconsultaPatientScreenProps {
  patientId: number;
}

export default function TeleconsultaPatientScreen({
  patientId,
}: TeleconsultaPatientScreenProps) {
  const [teleconsulta, setTeleconsulta] = useState<Teleconsulta | null>(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    async function fetchTeleconsulta() {
      try {
        const data = await getActiveTeleconsultation(patientId);
        setTeleconsulta(data);
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : "No se pudo cargar la Teleconsulta";

        toast.error(message, {
          icon: <CircleAlert color="#FAFAFA" size={20} />,
          style: { background: "#E74C3C", color: "#FAFAFA" },
        });
      } finally {
        setLoading(false);
      }
    }
    fetchTeleconsulta();
  }, [patientId]);

  const handleJoin = async () => {
    if (!teleconsulta) return;
    setJoining(true);
    try {
      const res = await joinTeleconsultation({
        teleconsultationId: teleconsulta.id,
        userId: patientId,
        role: "patient",
      });
      window.open(`https://meet.jit.si/salud-nc-${res.data.roomId}`, "_blank");

      toast.success("¡Te has unido a la teleconsulta!", {
        style: { background: "#2ECC71", color: "#FAFAFA" },
      });
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "No se pudo unir a la teleconsulta";

      toast.error(message, {
        icon: <CircleAlert color="#FAFAFA" size={20} />,
        style: { background: "#E74C3C", color: "#FAFAFA" },
      });
    } finally {
      setJoining(false);
    }
  };

  
  return (
    <div className="relative p-6 text-center">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-emerald-600 font-medium">
            Cargando teleconsulta...
          </p>
        </div>
      ) : !teleconsulta ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-gray-600">
          <p className="text-lg">No hay teleconsultas activas.</p>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mb-3 text-emerald-700">
            Teleconsulta con {teleconsulta.medicName}
          </h2>
          <p className="text-gray-600 mb-5">
            Fecha programada:{" "}
            {new Date(teleconsulta.scheduledDate).toLocaleString("es-AR")}
          </p>

          <button
            onClick={handleJoin}
            disabled={joining}
            className={`px-5 py-2 rounded-lg font-medium transition ${
              joining
                ? "bg-emerald-400 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700 text-white"
            }`}
          >
            {joining ? "Uniéndose..." : "Unirse a la Teleconsulta"}
          </button>
        </div>
      )}

     
      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  );
}
