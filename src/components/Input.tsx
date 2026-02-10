import { useState, type InputHTMLAttributes, type ReactNode } from "react";

export interface InputInterface extends InputHTMLAttributes<HTMLInputElement> {
  tipo: string;
  textoLabel: string;
  icon?: ReactNode;
  mensajeError: string;
  regex: RegExp;
  establecerError: (nombre: string, valorError: boolean) => void;
  actualizarInfo: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({
  tipo,
  placeholder,
  textoLabel,
  icon,
  mensajeError,
  regex,
  establecerError,
  actualizarInfo,
  ...props
}: InputInterface) => {
  const [error, setError] = useState(false);

  const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value;
    const nombre = e.target.name;
    if (!regex.test(valor)) {
      setError(true);
      establecerError(nombre, true);
    } else {
      setError(false);
      establecerError(nombre, false);
    }
  };
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium text-gray-700">{textoLabel}</label>
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>
        <input
          type={tipo}
          className={`w-full border  rounded-md px-10 py-2 text-sm outline-none ${error ? "border-red-500" : "border-gray-300"}`}
          placeholder={placeholder}
          onChange={actualizarInfo}
          onBlur={handleBlur}
          {...props}
        />
      </div>
      {error && <span className="text-red-500">{mensajeError}</span>}
    </div>
  );
};

export default Input;
