"use client"

import { useState } from "react"

export default function AdminScheduleConfig() {
  const [startTime, setStartTime] = useState("08:00")
  const [endTime, setEndTime] = useState("18:00")
  const [duration, setDuration] = useState("30")

  const timeOptions = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ]

  const durationOptions = [
    { value: "15", label: "15 minutos" },
    { value: "30", label: "30 minutos" },
    { value: "45", label: "45 minutos" },
    { value: "60", label: "60 minutos" },
    { value: "90", label: "90 minutos" },
    { value: "120", label: "120 minutos" },
  ]

  const handleSave = () => {
    console.log("Configuración guardada:", { startTime, endTime, duration })
  }

  return (
    <div className="w-full  max-w-4xl mx-auto rounded-3xl border border-gray-200  text-black p-8">
      <div className="mb-8">
        <h1 className="text-md font-normal ">Configuración de Agenda</h1>
        <p className="mt-1 text-sm text-gray-600">Gestiona horarios y disponibilidad</p>
      </div>

      <div className="space-y-6">
       {/* horarios */}
        <div>
          <label className="mt-1 text-sm text-gray-600 mb-3">Horario de atención</label>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-1 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            <span className="mt-1 text-sm text-gray-600 font-normal">a</span>

            <div className="relative flex-1">
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-1 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
              >
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* duración */}
        <div>
          <label className="mt-1 text-sm text-gray-600 mb-3">Duración de cita</label>
          <div className="relative">
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-4 py-1 bg-white border border-gray-300 rounded-lg text-gray-900 text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all"
            >
              {durationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

      
        <button
          onClick={handleSave}
          className="w-full py-2 px-4 bg-tourquoise hover:bg-teal-600  text-white text-base font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 shadow-sm"
        >
          Guardar Configuración
        </button>
      </div>
    </div>
  )
}
