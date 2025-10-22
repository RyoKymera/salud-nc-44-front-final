
// se usó en AdminUsersTable 

export type UserRole = "Médico" | "Paciente";
export type UserStatus = "activo" | "inactivo";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  specialty?: string;
  status: UserStatus;
  appointments: number;
}

// se usó en addUserModal

export type UserRoleFormData = "ADMIN" | "MEDIC" | "PATIENT" | "";
export type GenderFormData = "MALE" | "FEMALE" | "OTHER" | "";

export interface UserFormData {
  email: string;
  password: string;
  name: string;
  lastname: string;
  dni: string;
  userType: UserRoleFormData;
  gender: GenderFormData;
  birthdate: string;
  // campos específicos para médicos
  specialty?: string;
  schedule?: string;
  // campos específicos para pacientes
  phone_number?: string;
  address?: string;
}