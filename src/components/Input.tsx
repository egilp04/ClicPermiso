import { useState, type InputHTMLAttributes, type ReactNode } from "react";

export interface InputInterface extends InputHTMLAttributes<HTMLInputElement> {
  tipo: string;
  textoLabel: string;
  icon?: ReactNode;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  regex?: RegExp;
  tieneError: (nombre: string, error: boolean) => void;
  mensajeError: string;
}

const Input = ({
  onChange,
  tipo,
  textoLabel,
  icon,
  regex,
  mensajeError,
  tieneError,
  ...props
}: InputInterface) => {
  const [error, setError] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setError(false);
    onChange(e);
  };

  const handleBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const value = e.target.value;
    if (regex != null)
      if (!regex.test(value)) {
        console.log(e.target.value, regex.test(value));
        setError(true);
        tieneError(e.target.name, true);
      } else {
        setError(false);
        tieneError(e.target.name, false);
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
          className={`w-full border rounded-md px-10 py-2 text-sm outline-none ${error ? "border-red-600-50" : "border-gray-500"}`}
          {...props}
          onChange={handleChange}
          onBlur={handleBlur}
        />
      </div>
      {error && <span className="text-red-700">{mensajeError}</span>}
    </div>
  );
};

export default Input;
