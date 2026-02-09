import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import InputSelect from "./InputSelect";
import { getMonthText } from "../utils/Utils";

const FormDias = () => {
  const [dia, setDia] = useState({
    dia: new Date().getDate(),
    mes: getMonthText(new Date().getMonth() + 1),
    anio: new Date().getFullYear(),
  });

  const hoy = new Date();
  const diaActual = String(hoy.getDate()).padStart(2, "0");
  const mes = String(hoy.getMonth() + 1).padStart(2, "0");
  const anio = hoy.getFullYear();
  const [data, setData] = useState({
    fecha: `${anio}-${mes}-${diaActual}`,
    telefono: "000000000",
    numHoras: 0,
    numDias: 0,
    jornada: "sin seleccionar",
    turno: "sin seleccionar",
    noRetribuido: false,
  });

  const [errores, setError] = useState({
    fecha: true,
    telefono: true,
    jornada: true,
    turno: true,
    numDias: true,
    numHoras: true,
  });

  const hadleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hayErrores = Object.values(errores).some((error) => error === true);
    if (!hayErrores) {
      alert(
        `Solicitud guardada correctamente. Datos: \nFecha:${data.fecha} \nTelefono ${data.telefono} \nNumero de horas: ${data.numHoras} \nNumero de dias: ${data.numDias} \nJornada: ${data.jornada} \nTurno ${data.turno} `,
      );
    } else {
      alert(
        "Por favor, algunos campos tiene errores, corrige los errores antes de enviar.",
      );
    }
  };

  const actualizarInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setData((prev) => {
      const nuevaData = {
        ...prev,
        [e.target.name]: e.target.value,
      };
      return nuevaData;
    });

    if (e.target.name == "fecha") {
      const [anio, mes, dia] = e.target.value.split("-");
      setDia({
        dia: parseInt(dia),
        mes: getMonthText(parseInt(mes)),
        anio: parseInt(anio),
      });
    }
  };

  const tieneError = (nombre: string, error: boolean) => {
    console.log(nombre);
    setError((prev) => {
      return {
        ...prev,
        [nombre]: error,
      };
    });
  };
  return (
    <>
      <div className="flex flex-row w-full justify-between p-4">
        <div className="flex flex-row gap-4">
          <span className="material-symbols-outlined">calendar_today</span>
          <h1>
            <strong>
              Solicitar dia:
              {`${dia.dia} del mes ${dia.mes} del ${dia.anio}`}
            </strong>
          </h1>
        </div>
        <div className="flex flex-row gap-4 ">
          <span className="material-symbols-outlined"> keyboard_return</span>
          <label>volver</label>
        </div>
      </div>
      <div>
        <form className="grid grid-cols-2 p-4 gap-4" onSubmit={hadleSubmit}>
          <Input
            name="fecha"
            tipo="date"
            textoLabel="Dia solicitado"
            icon={
              <span className="material-symbols-outlined">calendar_today</span>
            }
            onChange={actualizarInfo}
            regex={/^\d{4}-\d{2}-\d{2}$/}
            tieneError={tieneError}
            mensajeError="Día válido, por favor"
          ></Input>
          <Input
            name="telefono"
            tipo="text"
            textoLabel="Número de Teléfono"
            icon={<span className="material-symbols-outlined">call</span>}
            onChange={actualizarInfo}
            regex={/^[6-9][0-9]{8}$/}
            tieneError={tieneError}
            mensajeError="Número de teléfono de 9 dígitos, que empiecen or 6,7,8,9"
          ></Input>
          <InputSelect
            textLabel="Jornada"
            name="jornada"
            options={["Sin seleccionar", "Parcial", "Completa"]}
            icon={<span className="material-symbols-outlined">history_2</span>}
            onChange={actualizarInfo}
            regex={/^(Parcial|Completa)$/}
            mensajeError="Seleccione un valor"
            tieneError={tieneError}
          ></InputSelect>
          <InputSelect
            textLabel="Turno solicitado"
            options={["Sin seleccionar", "Diurno", "Vespertino"]}
            icon={<span className="material-symbols-outlined">sunny</span>}
            name="turno"
            onChange={actualizarInfo}
            regex={/^(Diurno|Vespertino)$/}
            mensajeError="Seleccione un valor"
            tieneError={tieneError}
          ></InputSelect>
          <Input
            name="numHoras"
            tipo="number"
            textoLabel="Núm de horas de docencia directa y guardias afectada"
            icon={
              <span className="material-symbols-outlined">hourglass_empty</span>
            }
            onChange={actualizarInfo}
            regex={/^[1-8]{1}$/}
            tieneError={tieneError}
            mensajeError="De 1 a 8 dias"
          ></Input>
          <Input
            name="numDias"
            tipo="number"
            textoLabel="Núm de días de permisos solicitados en el centro"
            icon={<span className="material-symbols-outlined">table_rows</span>}
            onChange={actualizarInfo}
            regex={/^[1-8]{1}$/}
            tieneError={tieneError}
            mensajeError="De 1 a 8 dias"
          ></Input>
          <div className="col-span-2 flex flex-row gap-2">
            <input
              type="checkbox"
              name="noRetribuido"
              id="check1"
              onChange={actualizarInfo}
            ></input>
            <label htmlFor="check1">
              Estoy solicitando un día de permiso no retribuido
            </label>
          </div>
          {/* <div className="col-span-2 flex flex-row gap-2">
            <input type="checkbox" name="check2"></input>
            <label htmlFor="check2">¿Causa sobrevenida? </label>
          </div>
          <div className="col-span-2 flex flex-col gap-2">
            <label htmlFor="justificacion">
              Justificacion de la causa sobrevenida
            </label>
            <textarea
              name="justificacion"
              className="col-span-2 border border-gray-400 rounded bg-gray-100"
            ></textarea>
          </div> */}
          {/* <div className="col-span-2 flex flex-col gap-2">
            <label
              htmlFor="subirDoc"
              className="text-sm font-medium text-gray-700"
            >
              Documento Justificativo en PDF
            </label>
            <div className="flex items-center gap-1">
              <label
                htmlFor="subirDoc"
                className="px-2 py-1 border border-gray-300 rounded-md text-sm font-medium cursor-pointer hover:bg-gray-50 shadow-xs"
              >
                Seleccionar archivo
              </label>
              <span className="text-sm text-gray-400">nada seleccionado</span>
              <input id="subirDoc" type="file" className="hidden" />
            </div>
          </div> */}
          <div className="w-full mt-4 col-span-2">
            <hr className="opacity-[.15]"></hr>
          </div>
          <div className="flex flex-row gap-2 justify-end w-full col-span-2">
            <Button
              variant="secundario"
              children="Cancelar"
              type="button"
            ></Button>
            <Button
              variant="primario"
              children="Guardar solicitud"
              type="submit"
            ></Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormDias;
