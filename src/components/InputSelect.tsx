import type { ReactNode } from "react";

export interface InputSelectInterface {
  textLabel: string;
  options: string[];
  icon: ReactNode;
}

const InputSelect = ({ options, textLabel, icon }: InputSelectInterface) => {
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
        >
          {options.map((option) => (
            <option value={option}>{option}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InputSelect;
