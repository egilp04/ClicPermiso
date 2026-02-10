import { useState, type ReactNode, type SelectHTMLAttributes } from "react";

export interface InputSelectInterface extends SelectHTMLAttributes<HTMLSelectElement> {
  textLabel: string;
  options: string[];
  icon: ReactNode;
  mensajeError: string;
  regex: RegExp;
  establecerError: (nombre: string, valorError: boolean) => void;
  actualizarInfo: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const InputSelect = ({
  options,
  textLabel,
  icon,
  mensajeError,
  regex,
  actualizarInfo,
  establecerError,
  ...props
}: InputSelectInterface) => {
  const [error, setError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    actualizarInfo(e);
  };

  const handleError = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valor = e.target.value;
    const nombre = e.target.name;
    if (!regex.test(valor)) {
      establecerError(nombre, true);
      setError(true);
    } else {
      setError(false);
      establecerError(nombre, false);
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium text-gray-700" htmlFor="seleccion">
        {textLabel}
      </label>
      <div className="relative flex items-center">
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
          {icon}
        </div>
        <select
          name="seleccion"
          className="w-full border border-gray-300 rounded-md px-10 py-2 text-sm outline-none"
          {...props}
          onChange={handleChange}
          onBlur={handleError}
        >
          {options.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
      </div>
      {error && <span>{mensajeError}</span>}
    </div>
  );
};

export default InputSelect;
