import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonInterface extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primario" | "secundario";
  children: ReactNode;
}
const Button = ({
  variant = "primario",
  children,
  ...props
}: ButtonInterface) => {
  const base = "rounded py-1 px-1";

  const tipoClase = {
    primario: "bg-blue-600 text-white",
    secundario: "bg-gray-200 text-white",
  };

  return (
    <button className={`${base} ${tipoClase[variant]}`} {...props}>
      {" "}
      {children}
    </button>
  );
};

export default Button;
