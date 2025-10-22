import { User } from "@/app/types/User";


export const mockUsers: User[] = [
  {
    id: "1",
    name: "Dr. María González",
    role: "Médico",
    specialty: "Cardiología",
    status: "activo",
    appointments: 24,
  },
  {
    id: "2",
    name: "Dr. Carlos Ramírez",
    role: "Médico",
    specialty: "Pediatría",
    status: "activo",
    appointments: 18,
  },
  {
    id: "3",
    name: "Juan Pérez",
    role: "Paciente",
    status: "activo",
    appointments: 3,
  },
  {
    id: "4",
    name: "Ana Martínez",
    role: "Paciente",
    status: "activo",
    appointments: 5,
  },
  {
    id: "5",
    name: "Dr. Luis Torres",
    role: "Médico",
    specialty: "Neurología",
    status: "inactivo",
    appointments: 0,
  },
  {
    id: "6",
    name: "Carmen Silva",
    role: "Paciente",
    status: "activo",
    appointments: 2,
  },
];