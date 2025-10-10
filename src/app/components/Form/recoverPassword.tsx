"use client";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import {useRouter} from "next/navigation"
import LoadingForm from "./loandingForm";
import { CheckCircle, CircleAlert , ArrowLeft} from "lucide-react";

export default function RecoverPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("El correo es obligatorio", {
        icon: <CircleAlert color="#FAFAFA" size={20} />,
        style: { background: "#E74C3C", color: "#FAFAFA" },
      });
      return;
    }

    try {
      setLoading(true);

      const API_URL = process.env.NEXT_PUBLIC_API_URL;

      const res = await fetch(`${API_URL}/auth/recover`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        throw new Error("No se pudo enviar el enlace");
      }

      toast.success("Enlace enviado correctamente", {
        icon: <CheckCircle color="#FAFAFA" size={20} />,
        style: { background: "#10B948", color: "#FAFAFA" },
      });

    } catch (err) {
      console.error(err);
      toast.error("Error al enviar el enlace", {
        icon: <CircleAlert color="#FAFAFA" size={20} />,
        style: { background: "#E74C3C", color: "#FAFAFA" },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
       <button
            onClick={() => router.back()}
            className="absolute top-4 left-7 flex items-center justify-center text-[#0F2550]
                      w-[82px] sm:w-[95px]
                      px-3 py-2
                      bg-white/20 backdrop-blur-md border-l-3 border-[#1ABC9C]
                      font-medium rounded-md
                      hover:bg-[#1ABC9C] hover:border-[#1ABC9C]
                      active:scale-95 transition-all duration-200 cursor-pointer"
      >
            <ArrowLeft className="w-[15px] mr-1" /> Atrás
      </button>
     
      <form
        onSubmit={handleSubmit}
        className="w-[90%] max-w-[499px]  h-auto flex flex-col justify-center items-center gap-6 m-auto rounded-[20px] p-8 sm:p-10 md:p-12 opacity-90 bg-[#FDFDFD] border-l-[3px] border-[#1ABC9C] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
      >
        
        <h2 className="h-[36px] text-[#0F2550] font-Poppins text-xl sm:text-2xl font-normal leading-normal mb-4 sm:mb-6 text-center">
          Recuperar contraseña
        </h2>

      
        <input
          type="email"
          placeholder="Correo registrado"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full max-w-[403px] h-[44px] sm:h-[48px] rounded-[8px] bg-[#EFEFEF] px-3 shadow-[0_4px_4px_0_rgba(15,37,80,0.25)] outline-none focus:ring-2 focus:ring-[#1ABC9C] transition-all text-black placeholder:text-gray-500"
        />

        
        <button
          type="submit"
          disabled={loading}
          className="w-full max-w-[403px] h-[44px] sm:h-[48px] rounded-[8px] bg-[#1ABC9C] text-white font-Poppins font-medium shadow-[0_4px_4px_0_rgba(15,37,80,0.25)] my-4 hover:bg-[#17a589] transition-all duration-300 cursor-pointer"
        >
          {loading ? <LoadingForm /> : "Enviar enlace"}
        </button>

        <ToastContainer position="top-right" autoClose={2000} limit={2} />
      </form>
    </>
  );
}
