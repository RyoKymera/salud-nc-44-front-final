"use client";

import { useState, useEffect } from "react";
import { Plus, Trash, CircleAlert, Loader2 } from "lucide-react";
import FormModalCitaPaciente from "../modal/Form-modal";
import FormModalModificarCita from "../modal/Form-modalModificarCita";
import ConfirmaEliminacionCita from "../modal/ModalEliminaciondeCita";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

interface Cita {
  ID_Appointments: number;
  appointmentDatetime: string;
  appointmentType: string;
  notes?: string;
  status: string;
  patient: { Name: string; Lastname: string; Birthdate: string; DNI: string };
  medic: { Name: string; Lastname: string; specialty: string };
}

export default function CitasPatient() {
  const [micita, setMicita] = useState<Cita[]>([]);
  const [modal, setModal] = useState(false);
  const [modalModificarCita, setModalModificarCita] = useState<{ open: boolean; citaId?: number; date?: string; time?: string }>({ open: false });
  const [confirmModal, setConfirmModal] = useState<{ open: boolean; id?: number }>({ open: false });
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const toggleModal = () => setModal((prev) => !prev);

  const openUpdateModal = (citaId: number, datetime: string) => {
    const dt = new Date(datetime);
    const date = dt.toISOString().split("T")[0];
    const time = dt.toTimeString().split(" ")[0].slice(0, 5);
    setModalModificarCita({ open: true, citaId, date, time });
  };

  const closeUpdateModal = () => setModalModificarCita({ open: false });
  const handleOpenConfirm = (id: number) => setConfirmModal({ open: true, id });
  const handleCloseConfirm = () => setConfirmModal({ open: false, id: undefined });

  const obtenerCita = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/appointments");
      if (!res.ok) throw new Error("Error al obtener citas");
      const data = await res.json();
      setMicita(data);
    } catch {
      toast.error("Error al obtener citas", { style: { background: "#E74C3C", color: "#FAFAFA" } });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerCita();
  }, []);

  const eliminarCita = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/appointments/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Error eliminando la cita");
      setMicita(micita.filter((c) => c.ID_Appointments !== id));
      toast.success("Cita eliminada correctamente", { icon: <Trash color="#fff" size={20} />, style: { background: "#10B948", color: "#fff" } });
    } catch {
      toast.error("No se pudo eliminar la cita", { icon: <CircleAlert color="#FAFAFA" size={20} />, style: { background: "#E74C3C", color: "#FAFAFA" } });
    } finally {
      handleCloseConfirm();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#1ABC9C]" size={48} />
        <p className="mt-4 text-lg text-[#1ABC9C]">Cargando citas...</p>
      </div>
    );
  }

  const statusColor = {
    PENDING: "bg-yellow-400 text-black",
    CONFIRMED: "bg-green-500 text-white",
    COMPLETED: "bg-blue-500 text-white",
    CANCELLED: "bg-red-500 text-white",
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return null;

    const citasDelDia = micita.filter(
      (c) => new Date(c.appointmentDatetime).toDateString() === date.toDateString()
    );

    if (!citasDelDia.length) return null;

    // + info de citas
    const tooltip = citasDelDia.map(c => `${c.status}: ${c.appointmentType}`).join("\n");

    // Mostrar puntitos de colores por cada cita
    return (
      <span title={tooltip} className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
        {citasDelDia.map((c, idx) => (
          <span
            key={idx}
            className={`w-2 h-2 rounded-full ${statusColor[c.status as keyof typeof statusColor]}`}
          />
        ))}
      </span>
    );
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view !== "month") return "";
    const citasDelDia = micita.filter(
      (c) => new Date(c.appointmentDatetime).toDateString() === date.toDateString()
    );
    if (!citasDelDia.length) return "";

    return "relative font-semibold rounded-full border border-gray-300 hover:scale-105 transition-transform";
  };

  return (
    <div className="relative p-6 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="relative mb-8">
        <button
          onClick={toggleModal}
          className="absolute right-[-25] top-[-35px] sm:right-2 sm:top-[-65] flex items-center gap-2 px-4 py-3 text-white bg-[#1ABC9C] hover:bg-[#2ac5a6] border rounded-xl shadow transition-all duration-150 cursor-pointer"
        >
          <Plus /> Agendar cita
        </button>
      </div>

      {modal && <FormModalCitaPaciente onClose={toggleModal} onSuccess={obtenerCita} />}
      {modalModificarCita.open && modalModificarCita.citaId && (
        <FormModalModificarCita
          appointmentId={modalModificarCita.citaId}
          initialDate={modalModificarCita.date!}
          initialTime={modalModificarCita.time!}
          onClose={closeUpdateModal}
          onSuccess={obtenerCita}
        />
      )}

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 order-1 md:order-1">
          <Calendar
            onChange={(val) => val instanceof Date && setSelectedDate(val)}
            value={selectedDate}
            tileClassName={tileClassName}
            tileContent={tileContent}
            className="w-full m-auto mt-10 sm:mt-[118px] borde rounded-xl shadow p-2 text-center "
          />
         <div className="mt-16 text-center p-4 bg-white/40 backdrop-blur-md rounded-xl shadow-md border border-white/30">
          <p className="text-[#1ABC9C] font-extralight mb-1">📅 Fecha seleccionada:</p>
          <p className="text-lg font-extralight text-gray-900">
            {selectedDate.toLocaleDateString("es-AR", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        </div>

        
        <div className="md:w-2/3 order-2 md:order-2">
          <h1 className="text-[24px] sm:mt-[-25] text-center font-bold my-12 text-[#1ABC9C]">Próximas citas</h1>
           {Object.entries(
            micita
              .slice()
              .sort((a, b) => new Date(a.appointmentDatetime).getTime() - new Date(b.appointmentDatetime).getTime())
              .reduce((acc, cita) => {
                const dateKey = new Date(cita.appointmentDatetime).toLocaleDateString("es-AR");
                if (!acc[dateKey]) acc[dateKey] = [];
                acc[dateKey].push(cita);
                return acc;
              }, {} as Record<string, typeof micita>)
          ).map(([fecha, citasDelDia]) => (
            <div key={fecha} className="mb-10">
              <h3 className="text-2xl font-semibold mb-4 border-b border-gray-300 pb-2">📅 {fecha}</h3>
              <ul className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
                {citasDelDia.map((cita) => (
                  <li
                    key={cita.ID_Appointments}
                    className="w-full bg-white/10 border border-gray-300 rounded-xl p-5 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 text-black"
                  > 
                    <p className="mb-2 flex justify-between items-center">
                      <span className="font-semibold">✅ Estado:</span>
                      <span className={`font-medium px-2 py-1 text-white rounded-tl rounded-br ${statusColor[cita.status as keyof typeof statusColor]}`}>
                        {cita.status}
                      </span>
                    </p>
                    <p className="mb-2 flex justify-between">
                      <span className="font-semibold">🕓 Hora:</span>
                      {new Date(cita.appointmentDatetime).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                    <p className="mb-2 flex justify-between">
                      <span className="font-semibold">👨‍⚕️ Doctor:</span>
                      {cita.medic.Name} {cita.medic.Lastname}
                    </p>
                    <p className="mb-2 flex justify-between">
                      <span className="font-semibold">📌 Tipo:</span> {cita.appointmentType}
                    </p>
                    
                    <div className="flex justify-between gap-3 mt-6">
                      <button
                        onClick={() => handleOpenConfirm(cita.ID_Appointments)}
                        className="flex-1 bg-red-600/70 hover:bg-red-600/90 text-white font-medium py-2 px-4 rounded-sm shadow-sm transition-colors cursor-pointer"
                      >
                        Eliminar
                      </button>
                      <button
                        onClick={() => openUpdateModal(cita.ID_Appointments, cita.appointmentDatetime)}
                        className="flex-1 bg-blue-600/70 hover:bg-blue-600/90 text-white font-medium py-2 px-4 rounded-sm shadow-sm transition-colors cursor-pointer"
                      >
                        Modificar
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>


      {confirmModal.open && (
        <ConfirmaEliminacionCita
          onConfirm={() => eliminarCita(confirmModal.id!)}
          onCancel={handleCloseConfirm}
        />
      )}
    </div>
  );
}
