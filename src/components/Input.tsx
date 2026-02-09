import { useState, type ReactNode } from "react";

export interface InputInterface {
  tipo: string;
  textoLabel: string;
  placeholder?: string;
  icon?: ReactNode;
  mensajeErro: string;
  establecerError: () => void;
  onchange: () => void;
}

const Input = ({
  tipo,
  placeholder,
  textoLabel,
  icon,
  mensajeError,
  establecerError,
  onchange,
}: InputInterface) => {
  const [error, setError] = useState(false);
  const handleChange = (e) => {
    onchange(e);
  };
  const handleBlur = (e) => {};
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium text-gray-700">{textoLabel}</label>
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>
        <input
          type={tipo}
          className="w-full border border-gray-300 rounded-md px-10 py-2 text-sm outline-none"
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {error && <span>{mensajeError}</span>}
    </div>
  );
};

export default Input;
