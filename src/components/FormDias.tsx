import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import InputSelect from "./InputSelect";

const getMonthText = (value: number) => {
  switch (value) {
    case 1:
      return "Enero";
    case 2:
      return "Febrero";
    case 3:
      return "Marzo";
    case 4:
      return "Arbil";
    case 5:
      return "Mayo";
    case 6:
      return "Junio";
    case 7:
      return "Julio";
    case 8:
      return "Agosto";
    case 9:
      return "Septiembre";
    case 10:
      return "Octubre";
    case 11:
      return "Noviembre";
    case 12:
      return "Dicembre";
  }
};

const FormDias = () => {
  const [dia, setDia] = useState({
    dia: new Date().getDate(),
    mes: getMonthText(new Date().getMonth() + 1),
    anio: new Date().getFullYear(),
  });
  return (
    <>
      <div className="flex flex-row w-full justify-between p-4">
        <div className="flex flex-row gap-4">
          <span className="material-symbols-outlined">calendar_today</span>
          <h1>
            <strong>
              Solicitar dia:{" "}
              {`${dia.dia} del mes ${dia.mes} del ${dia.anio}`}{" "}
            </strong>
          </h1>
        </div>
        <div className="flex flex-row gap-4 ">
          <span className="material-symbols-outlined"> keyboard_return</span>
          <label>volver</label>
        </div>
      </div>
      <div>
        <form className="grid grid-cols-2 p-4 gap-4">
          <Input
            tipo="date"
            textoLabel="Dia solicitado"
            icon={
              <span className="material-symbols-outlined">calendar_today</span>
            }
          ></Input>
          <Input
            tipo="text"
            textoLabel="Número de Teléfono"
            icon={<span className="material-symbols-outlined">call</span>}
          ></Input>
          <InputSelect
            textLabel="Jornada"
            options={["-----", "12 horas", "14 horas"]}
            icon={<span className="material-symbols-outlined">history_2</span>}
          ></InputSelect>
          <InputSelect
            textLabel="Turno solicitado"
            options={["Diurno", "Vespertino"]}
            icon={<span className="material-symbols-outlined">sunny</span>}
          ></InputSelect>
          <Input
            tipo="number"
            textoLabel="Núm de horas de docencia directa y guardias afectada"
            icon={
              <span className="material-symbols-outlined">hourglass_empty</span>
            }
          ></Input>
          <Input
            tipo="number"
            textoLabel="Núm de días de permisos solicitados en el centro"
            icon={<span className="material-symbols-outlined">table_rows</span>}
          ></Input>
          <div className="col-span-2 flex flex-row gap-2">
            <input type="checkbox" name="check1"></input>
            <label htmlFor="check1">
              Estoy solicitando un día de permiso no retribuido
            </label>
          </div>
          <div className="col-span-2 flex flex-row gap-2">
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
          </div>
          <div className="col-span-2 flex flex-col gap-2">
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
          </div>
          <div className="w-full mt-4 col-span-2">
            <hr className="opacity-[.15]"></hr>
          </div>
          <div className="flex flex-row gap-2 justify-end w-full col-span-2">
            <Button tipo="secundario" children="Cancelar"></Button>
            <Button tipo="primario" children="Guardar solicitud"></Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FormDias;
