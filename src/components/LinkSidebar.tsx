import type { ReactNode } from "react";

export interface LinkSidebarInterface {
  icono: ReactNode;
  texto: string;
}

const LinkSidebar = ({ icono, texto }: LinkSidebarInterface) => {
  return (
    <div className="text-gray-400 flex flex-row items-center">
      {icono}
      {texto}
    </div>
  );
};

export default LinkSidebar;
