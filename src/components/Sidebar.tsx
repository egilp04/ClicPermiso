import LinkSidebar from "./LinkSidebar";

const Sidebar = () => {
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
    </div>
  );
};

export default Sidebar;
