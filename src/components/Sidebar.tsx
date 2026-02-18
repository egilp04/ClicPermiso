import { useAuthStore } from "../store/AuthStore";
import LinkSidebar from "./LinkSidebar";

const Sidebar = () => {
  const session = useAuthStore((state) => state.session);

  return (
    <div className="mt-10 flex  flex-col gap-4">
      <LinkSidebar
        icono={<span className="material-symbols-outlined">event</span>}
        texto="Sol. dia diurno"
        direccion=""
      ></LinkSidebar>
      <LinkSidebar
        icono={<span className="material-symbols-outlined">event</span>}
        texto="Sol. dia vespertino"
        direccion="vespertino"
      ></LinkSidebar>
      <LinkSidebar
        icono={<span className="material-symbols-outlined">person</span>}
        texto="Mi perfil"
        direccion="perfil"
      ></LinkSidebar>
      <LinkSidebar
        icono={
          <span className="material-symbols-outlined">calendar_today</span>
        }
        texto="Mis días solicitados"
        direccion="dias-solicitados"
      ></LinkSidebar>{" "}
      <LinkSidebar
        icono={<span className="material-symbols-outlined">event</span>}
        texto="Mis ausencias"
        direccion="ausencias"
      ></LinkSidebar>
      {session && (
        <LinkSidebar
          texto="😁Dashboard"
          direccion="dashboard"
          icono
        ></LinkSidebar>
      )}
    </div>
  );
};

export default Sidebar;
