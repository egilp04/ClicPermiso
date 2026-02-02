import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

export interface LinkSidebarInterface {
  icono: ReactNode;
  texto: string;
  direccion: string;
}

const LinkSidebar = ({ icono, texto, direccion }: LinkSidebarInterface) => {
  return (
    <NavLink
      to={direccion}
      className={({ isActive }) => {
        return isActive
          ? "text-blue-500 flex flex-row items-center"
          : "text-gray-400 flex flex-row items-center";
      }}
    >
      {icono}
      {texto}
    </NavLink>
  );
};

export default LinkSidebar;
