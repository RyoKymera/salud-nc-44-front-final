"use client";
import AdminScheduleConfig from "@/app/components/AdminScheduleConfig/AdminScheduleConfig";
import { AdminUsersTable } from "../../components/AdminUsersTable/AdminUsersTable";

export default function AdminDashboard() {
  return (
    <div className="h-screen bg-white text-black p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      </div>


<section className=" container mx-auto p-4 rounded-lg ">

      <AdminUsersTable />

      <article className="grid grid-cols-2 gap-4 mt-6  ">
        <div className="col-span-1">
          <AdminScheduleConfig />
        </div>
        <div className="col-span-1">
         {/* la otra columna */}
        </div>
      </article>
</section>
    </div>
  );
}
