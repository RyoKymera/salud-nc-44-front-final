import { HiMiniPlus } from "react-icons/hi2";
import MyCalendar from "../components/CalendarDoc";

export default function DoctorDashboardPage() {
  return (
    <div className="mt-16">
        <header className="flex flex-row items-center justify-between">
            <div className="flex flex-col gap-2">
                <h1 className="text-primary text-2xl font-medium">Mi Agenda Médica</h1>
                <p className="text-base">Gestiona tus consultas y pacientes</p>
            </div>
            <div className="">
                <button
                    type="button"
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                    <HiMiniPlus className="w-5 h-5"/>
                    Nueva Cita
                </button>
            </div>
        </header>

        <main>
            <MyCalendar />
        </main>

    </div>
  )
}



