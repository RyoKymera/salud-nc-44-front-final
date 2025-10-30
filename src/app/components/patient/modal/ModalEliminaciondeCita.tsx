"use client";

import { X, Trash } from "lucide-react";

interface ConfirmDeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmaEliminacionCita({ onConfirm, onCancel }: ConfirmDeleteModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white/10 border border-white/20 backdrop-blur-xl p-6 rounded-2xl w-[90%] sm:w-[400px] shadow-lg text-white relative">
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-white hover:text-red-400 transition-all cursor-pointer"
        >
          <X size={22} />
        </button>

        <div className="flex flex-col items-center text-center">
          <Trash className="text-red-500 mb-3" size={36} />
          <h2 className="text-xl font-semibold mb-2">¿Eliminar cita?</h2>
          <p className="text-white/80 text-sm mb-6">
            Esta acción no se puede deshacer. ¿Deseas continuar?
          </p>

          <div className="flex gap-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-xl bg-gray-500/60 hover:bg-gray-600 transition-all shadow-sm cursor-pointer"
            >
              Cancelar
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded-xl bg-red-600/70 hover:bg-red-600/90 transition-all shadow-md cursor-pointer"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
