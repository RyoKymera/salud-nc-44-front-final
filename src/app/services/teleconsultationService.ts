const API_URL = process.env.API_URL

export interface JoinTeleconsultationData {
  teleconsultationId: number;
  userId: number;
  role: "patient";
}

//Obtener la teleconsulta activa para este paciente
export async function getActiveTeleconsultation(patientId: number) {
  const res = await fetch(`${API_URL}/active/${patientId}`);
  if (!res.ok) throw new Error("No hay teleconsulta activa");
  return res.json();
}

//Unirse a teleconsulta iniciada por el médico
export async function joinTeleconsultation(data: JoinTeleconsultationData) {
  const res = await fetch(`${API_URL}/join`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Error uniéndose a la teleconsulta");
  return res.json();
}
