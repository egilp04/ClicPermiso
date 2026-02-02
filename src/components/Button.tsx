import type { ReactNode } from "react";

export interface ButtonInterface {
  tipo: string;
  children: ReactNode;
}
const Button = ({ tipo, children }: ButtonInterface) => {
  const base = "rounded py-1 px-1";
  const tipoClase = {
    primario: "bg-blue-600 text-white",
    secundario: "bg-gray-200 text-white",
  };

  return <button className={`${base} ${tipoClase[tipo]}`}> {children}</button>;
};

export default Button;
