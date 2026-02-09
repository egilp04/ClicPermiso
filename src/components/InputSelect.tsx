import { useState, type ReactNode, type SelectHTMLAttributes } from "react";

export interface InputSelectInterface extends SelectHTMLAttributes<HTMLSelectElement> {
  textLabel: string;
  options: string[];
  icon: ReactNode;
  regex?: RegExp;
  mensajeError: string;
  tieneError: (nombre: string, error: boolean) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
}

const InputSelect = ({
  options,
  textLabel,
  icon,
  regex,
  mensajeError,
  onChange,
  tieneError,
  ...props
}: InputSelectInterface) => {
  const [error, setError] = useState(false);
  const handleBlur = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const value = e.target.value;
    if (regex != null)
      if (!regex.test(value)) {
        setError(true);
        console.log(e.target.name);
        tieneError(e.target.name, true);
      } else {
        setError(false);
        tieneError(e.target.name, false);
      }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    onChange(e);
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
          className="w-full border border-gray-300 rounded-md px-10 py-2 text-sm outline-none"
          {...props}
          onBlur={handleBlur}
          onChange={handleChange}
        >
          {options.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
      </div>
      {error && <span className="text-red-500">{mensajeError}</span>}
    </div>
  );
};

export default InputSelect;
