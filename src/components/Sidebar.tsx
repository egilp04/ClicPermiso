import LinkSidebar from "./LinkSidebar";

const Sidebar = () => {
  return (
    <div className="mt-10 flex  flex-col gap-4">
      <LinkSidebar
        icono={<span className="material-symbols-outlined">event</span>}
        texto="Sol. dia diurno"
      ></LinkSidebar>
      <LinkSidebar
        icono={<span className="material-symbols-outlined">event</span>}
        texto="Sol. dia vespertino"
      ></LinkSidebar>
      <LinkSidebar
        icono={<span className="material-symbols-outlined">person</span>}
        texto="Mi perfil"
      ></LinkSidebar>
      <LinkSidebar
        icono={
          <span className="material-symbols-outlined">calendar_today</span>
        }
        texto="Mis días solicitados"
      ></LinkSidebar>{" "}
      <LinkSidebar
        icono={<span className="material-symbols-outlined">event</span>}
        texto="Mis ausencias"
      ></LinkSidebar>
    </div>
  );
};

export default Sidebar;
