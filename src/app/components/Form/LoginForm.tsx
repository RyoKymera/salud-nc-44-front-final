"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import LoadingForm from "./loandingForm";
import { Eye, EyeOff, CircleAlert } from "lucide-react";

export default function LoginForm() {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!dni || !password) {
      toast.error("Todos los campos son obligatorios", {
        icon: <CircleAlert color="#FAFAFA" size={20} />,
        style: { background: "#E74C3C", color: "#FAFAFA" },
         
      });

       return;

    } else if (dni.length < 7 ) {
      toast.error("El DNI debe tener entre 7 y 8 caracteres", {
        icon: <CircleAlert color="#FAFAFA" size={20} />,
        style: { background: "#E74C3C", color: "#FAFAFA" },
      });
      return; 
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ DNI: dni, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Credenciales incorrectas");
      }

      // Guardamos el token
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
      }

      // Guardamos el rol
      if (data.role) {
        localStorage.setItem("role", data.role);
      }

      toast.success("Inicio de sesión exitoso", {
        style: { background: "#1ABC9C", color: "#FAFAFA" },
      });

      // según el rol
      switch (data.role) {
        case "ADMIN":
          router.push("/admin/dashboard");
          break;
        case "MEDIC":
          router.push("/user/dashboard");
          break;
        case "PATIENT":
          router.push("/patient/dashboard");
          break;
        default:
          router.push("/dashboard");
      }

    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Ocurrió un error inesperado";

      toast.error(message, {
        icon: <CircleAlert color="#FAFAFA" size={20} />,
        style: { background: "#E74C3C", color: "#FAFAFA" },
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRecoverPassword = () => {
    router.push("/recoverPassword");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-[90%] max-w-[499px] mt-[55px] h-auto flex flex-col bg-[#FDFDFD] justify-center items-center gap-6 m-auto rounded-[20px] p-8 sm:p-10 md:p-12 opacity-90 border-l-3 border-[#1ABC9C] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
      >
        <h1 className="text-[#0F2550] font-Poppins text-2xl font-normal mb-6 text-center">
          Iniciar sesión
        </h1>

        <label className="flex flex-col w-full max-w-[403px] text-[#0F2550] font-Poppins text-sm font-medium">
          DNI
          <input
              type="text"
              value={dni}
              autoComplete="username"
              maxLength={8}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) { //solo numero
                  setDni(value);
                }
          }}
            className="w-full h-[48px] rounded-[8px] bg-[#EFEFEF] px-3 shadow-md outline-none focus:ring-2 focus:ring-[#1ABC9C] transition-all text-black placeholder:text-gray-500"
            placeholder="Ingresa tu DNI"
          />
        </label>

        <label
          htmlFor="password"
          className="relative flex flex-col w-full max-w-[403px] text-[#0F2550] font-Poppins text-sm font-medium"
        >
          Contraseña
          <input
            
            type={visible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            name="password"
            className="w-full h-[48px] rounded-[8px] bg-[#EFEFEF] px-3 pr-10 shadow-md outline-none focus:ring-2 focus:ring-[#1ABC9C] transition-all text-black placeholder:text-gray-500"
            placeholder="Ingresa tu contraseña"
          />
          <button
            type="button"
            onClick={() => setVisible(!visible)}
            className="absolute right-3 top-8 text-[#0F2550] hover:text-gray-900 cursor-pointer"
          >
            {visible ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </label>


        <button
          type="submit"
          disabled={loading}
          className="w-full max-w-[403px] h-[48px] rounded-[8px] bg-[#1ABC9C] text-white font-Poppins font-medium shadow-md hover:bg-[#17a589] transition-all cursor-pointer"
        >
          {loading ? <LoadingForm /> : "Iniciar sesión"}
        </button>

        <button
          type="button"
          onClick={handleRecoverPassword}
          className="text-sm text-[#0F2550] underline hover:text-[#1ABC9C] transition-all font-Poppins cursor-pointer"
        >
          ¿Olvidaste tu contraseña?
        </button>

        <ToastContainer position="top-right" autoClose={2000} limit={2} />
      </form>
    </div>
  );
}
