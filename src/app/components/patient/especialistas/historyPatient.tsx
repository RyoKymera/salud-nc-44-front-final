"use client";

import { useState, useEffect } from "react";
import { Stethoscope } from "lucide-react";

type Especialista = {
  ID_medics: number;
  Name: string;
  Lastname: string;
  specialty?: string | null;
  email: string;
  phone_number?: string | null;
};

export default function ListaDeEspecialistas() {
  const [especialistas, setEspecialistas] = useState<Especialista[]>([]);
  const [especialidadFiltro, setEspecialidadFiltro] = useState<string>("Todas");
  const [paginaActual, setPaginaActual] = useState(1);
  const [loading, setLoading] = useState(true);
  const especialistasPorPagina = 10;

  const obtenerEspecialistas = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/medics");
      if (!res.ok) throw new Error("Error al obtener especialistas");
      const data = await res.json();
      setEspecialistas(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerEspecialistas();
  }, []);

  //especialidad
  const especialistasFiltrados = especialistas.filter((medic) =>
    especialidadFiltro === "Todas" ? true : medic.specialty === especialidadFiltro
  );

  // Calcular rango de especialistas a mostrar
  const indiceUltimo = paginaActual * especialistasPorPagina;
  const indicePrimero = indiceUltimo - especialistasPorPagina;
  const especialistasActuales = especialistasFiltrados.slice(indicePrimero, indiceUltimo);

  const totalPaginas = Math.ceil(especialistasFiltrados.length / especialistasPorPagina);

  const cambiarPagina = (numero: number) => {
    if (numero >= 1 && numero <= totalPaginas) setPaginaActual(numero);
  };

  //única de especialidades
  const especialidadesUnicas = Array.from(
    new Set(especialistas.map((m) => m.specialty).filter(Boolean))
  );

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto w-full">
      <div className="flex text-2xl sm:justify-center items-center font-bold mb-4 gap-2">
        <Stethoscope className="text-violet-900" />
        <h1 className="text-violet-500">Listado de Especialistas</h1>
      </div>

      {/* Filtro de especialidad */}
      <div className="relative mt-14 mb-6 flex justify-center items-end">
        <select
          className="absolute right-2 w-[280px] sm:w-[300px] px-4 py-2 rounded 
                    bg-white/10 backdrop-blur-md border border-violet-300/40 
                    text-violet-600 font-medium shadow-sm 
                    hover:bg-white/20 hover:border-violet-400/50 
                    focus:ring-2 focus:ring-violet-300/40 outline-none 
                    transition-all duration-300 cursor-pointer"
          value={especialidadFiltro}
          onChange={(e) => {
            setEspecialidadFiltro(e.target.value);
            setPaginaActual(1);
          }}
        >
          <option value="Todas">Seleccione la especialidad</option>
          {especialidadesUnicas.map((esp) => (
            <option key={esp} value={esp ?? ""}>
              {esp ?? ""}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        
        <div className="flex justify-center items-center h-[300px]">
          <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Tabla para escritorio */}
          <div className="overflow-x-auto rounded-2xl bg-white/10 backdrop-blur-md shadow-md hidden sm:block">
            <table className="w-full text-left text-sm md:text-base min-w-[600px]">
              <thead className="border-b border-white/20 bg-violet-200/70 text-black">
                <tr>
                  <th className="p-3 text-violet-800">#</th>
                  <th className="p-3 text-violet-800">Nombre</th>
                  <th className="p-3 text-violet-800">Especialidad</th>
                  <th className="p-3 text-violet-800">Email</th>
                  <th className="p-3 text-violet-800">Teléfono</th>
                </tr>
              </thead>
              <tbody>
                {especialistasActuales.length > 0 ? (
                  especialistasActuales.map((medic, index) => (
                    <tr
                      key={medic.ID_medics}
                      className={`border-b border-white/10 hover:bg-white/20 transition ${
                        index % 2 === 0 ? "bg-violet-100/60" : "bg-violet-50/60"
                      }`}
                    >
                      <td className="p-3 text-center font-medium">{indicePrimero + index + 1}</td>
                      <td className="p-3 font-semibold">{medic.Name} {medic.Lastname}</td>
                      <td className="p-3">{medic.specialty || "—"}</td>
                      <td className="p-3">{medic.email}</td>
                      <td className="p-3">{medic.phone_number || "—"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="p-4 text-center text-black bg-white/40">
                      No hay especialistas registrados.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Tarjetas para pantalla pequeña */}
          <div className="sm:hidden flex flex-col gap-3">
            {especialistasActuales.map((medic, index) => (
              <div
                key={medic.ID_medics}
                className={`p-4 rounded border border-violet-200 shadow hover:shadow-md transition-all duration-300 ${
                  index % 2 === 0 ? "bg-violet-100/80" : "bg-white"
                }`}
              >
                <div className="flex justify-between items-center mb-3 border-b border-emerald-300 pb-1">
                  <span className="font-semibold text-lg text-emerald-400 tracking-wide">
                    {medic.Name} {medic.Lastname}
                  </span>
                  <span className="text-sm font-semibold text-emerald-400 bg-emerald-100/80 px-2 py-[2px] rounded-md shadow-sm">
                    #{indicePrimero + index + 1}
                  </span>
                </div>

                <p className="flex justify-between items-center text-gray-800 py-1 border-b border-gray-200/70">
                  <strong>Especialidad:</strong>{" "}
                  <span className="text-emerald-900">{medic.specialty || "—"}</span>
                </p>
                <p className="flex justify-between items-center text-gray-800 py-1 border-b border-gray-200/70">
                  <strong>Email:</strong>{" "}
                  <span className="text-violet-900">{medic.email}</span>
                </p>
                <p className="flex justify-between items-center text-gray-800 py-1 border-b border-gray-200/70">
                  <strong>Teléfono:</strong>{" "}
                  <span className="text-sky-900 font-medium">{medic.phone_number || "—"}</span>
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Paginación */}
      <div className="flex flex-wrap justify-center items-center gap-2 mt-4">
        <button
          onClick={() => cambiarPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
          className="px-3 py-1 text-white rounded-br rounded-tl bg-violet-500 hover:bg-violet-600 text-sm sm:text-base cursor-pointer"
        >
          ⬅ Anterior
        </button>

        {[...Array(totalPaginas)].map((_, i) => (
          <button
            key={i}
            onClick={() => cambiarPagina(i + 1)}
            className={`px-3 py-1 rounded-lg text-sm sm:text-base cursor-pointer ${
              paginaActual === i + 1 ? "bg-violet-600 text-white" : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          onClick={() => cambiarPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
          className="px-3 py-1 text-white rounded-bl rounded-tr bg-violet-500 hover:bg-violet-600 text-sm sm:text-base cursor-pointer"
        >
          Siguiente ➡
        </button>
      </div>
    </div>
  );
}
