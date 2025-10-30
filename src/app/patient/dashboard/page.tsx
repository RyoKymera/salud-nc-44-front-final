"use client";
import { useAuthStore } from "@/app/store/authStore";

import HeaderPatient from "@/app/components/patient/header-patient/Header";



export default function PatientDashboard() {
  const { user } = useAuthStore();


     if (!user) 
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-[50px] h-[50px] rounded-full border-b border-r border-violet-800 animate-spin"></div>
    </div>
  );

  return (
   
      <HeaderPatient/>
      
  
  );
}
