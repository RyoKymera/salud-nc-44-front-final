"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import LoadingForm from "./loandingForm";
import { CheckCircle, CircleAlert } from "lucide-react";

interface ResetPasswordFormProps {
  token?: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !confirm) {
      toast.error("Todos los campos son obligatorios", {
        icon: <CircleAlert color="#FAFAFA" size={20} />,
        style: { background: "#E74C3C", color: "#FAFAFA" },
      });
      return;
    }

    if (password.length < 8) {
      toast.error("La contraseña debe tener al menos 8 caracteres", {
        icon: <CircleAlert color="#FAFAFA" size={20} />,
        style: { background: "#E74C3C", color: "#FAFAFA" },
      });
      return;
    }

    if (password !== confirm) {
      toast.error("Las contraseñas no coinciden", {
        icon: <CircleAlert color="#FAFAFA" size={20} />,
        style: { background: "#E74C3C", color: "#FAFAFA" },
      });
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/auth/reset`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: password }),
      });

      if (!res.ok) throw new Error("No se pudo restablecer la contraseña");

      toast.success("Contraseña actualizada correctamente", {
        icon: <CheckCircle color="#FAFAFA" size={20} />,
        style: {
          background: "#10B948",
          color: "#FFFFFF",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        },
      });

      setTimeout(() => router.push("/login"), 2000);
    } catch (err) {
      
      toast.error("Error al restablecer la contraseña", {
        icon: <CircleAlert color="#FAFAFA" size={20} />,
        style: { background: "#E74C3C", color: "#FAFAFA" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[90%] max-w-[499px] mt-[55px] flex flex-col justify-center items-center gap-6 m-auto rounded-[20px] p-8 sm:p-10 md:p-12 bg-[#FDFDFD] border-l-[3px] border-[#1ABC9C] shadow-md"
    >
      <h2 className="text-[#0F2550] font-Poppins text-xl sm:text-2xl font-normal text-center">
        Nueva contraseña
      </h2>

      <input
        type="password"
        placeholder="Nueva contraseña"
        value={password}
        minLength={8}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full max-w-[403px] h-[48px] rounded-[8px] bg-[#EFEFEF] px-3 shadow-md outline-none focus:ring-2 focus:ring-[#1ABC9C] transition-all text-black placeholder:text-gray-500"
      />

      <input
        type="password"
        placeholder="Confirmar contraseña"
        value={confirm}
        minLength={8}
        onChange={(e) => setConfirm(e.target.value)}
        className="w-full max-w-[403px] h-[48px] rounded-[8px] bg-[#EFEFEF] px-3 shadow-md outline-none focus:ring-2 focus:ring-[#1ABC9C] transition-all text-black placeholder:text-gray-500"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full max-w-[403px] h-[48px] rounded-[8px] bg-[#1ABC9C] text-white font-Poppins font-medium shadow-md hover:bg-[#17a589] transition-all cursor-pointer"
      >
        {loading ? <LoadingForm /> : "Actualizar contraseña"}
      </button>

      <ToastContainer position="top-right" autoClose={2000} limit={2} />
    </form>
  );
}
