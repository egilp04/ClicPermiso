import ausencia from "../mock/ausencia.json";

const Ausencias = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-10 mt-10">
      <div className="w-full text-center">
        <h1 className="text-4xl font-bold">
          <span className="material-symbols-outlined text-4xl">
            calendar_month
          </span>
          Historial de Ausencias justificadas
        </h1>
      </div>
      <div className="flex flex-col justify-center w-full items-center">
        <div className="flex flex-row justify-around w-full">
          <h2 className="w-full">Periodo</h2>
          <h2 className="w-full">Estado</h2>
          <h2 className="w-full">Ultima modificacion</h2>
          <h2 className="w-full">Anexo V</h2>
          <h2 className="w-full">Adjunto</h2>
          <h2 className="w-full">Acciones</h2>
        </div>
        {ausencia.map(
          ({
            periodo,
            estado,
            ultima_modificacion,
            anexo_V,
            adjunto,
            acciones,
          }) => (
            <div className="flex flex-row  justify-around w-full">
              <h2 className="w-full">{periodo}</h2>
              <h2 className="w-full">{estado}</h2>
              <h2 className="w-full">{ultima_modificacion}</h2>
              <h2 className="w-full">{anexo_V}</h2>
              <h2 className="w-full">{adjunto}</h2>
              <h2 className="w-full">{acciones}</h2>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default Ausencias;
