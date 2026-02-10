import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import InputSelect from "./InputSelect";

const Form = () => {
  const [data, setData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    dni: "",
    estado: "Otros",
    aniosServicio: 0,
  });
  const [error, setError] = useState({
    nombre: false,
    apellidos: false,
    email: false,
    dni: false,
    estado: false,
    aniosServicio: false,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hadErrors = Object.values(error).some((value) => value == true);
    if (hadErrors) {
      alert("Hay errores, lo sentimos");
    } else {
      alert(
        `Nombre: ${data.nombre}, \nApellidos. ${data.apellidos}, \nDni: ${data.dni} \nEmail: ${data.email}  \nEstado civil: ${data.estado}  \nAñios de Servicio: ${data.aniosServicio}`,
      );
    }
  };

  const establecerError = (nombre: string, valorError: boolean) => {
    setError({ ...error, [nombre]: valorError });
  };

  const actualizarInfo = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setData((prev) => {
      const newData = {
        ...prev,
        [e.target.name]: e.target.value,
      };
      return newData;
    });
  };

  return (
    <>
      <div className="flex flex-row w-full justify-between p-4">
        <div className="flex flex-row gap-4">
          <h1>
            <strong>Modificar mi perfil: </strong>
          </h1>
        </div>
        <div className="flex flex-row gap-4 ">
          <span className="material-symbols-outlined"> keyboard_return</span>
          <label>volver</label>
        </div>
      </div>
      <div>
        <form className="grid grid-cols-2 p-4 gap-4" onSubmit={handleSubmit}>
          <Input
            tipo="text"
            textoLabel="Nombre"
            icon={<span className="material-symbols-outlined">person</span>}
            mensajeError="Nombre incorrecto, debe iniciar en mayúsculas, si hay más de uno debe ir separado por espacios"
            placeholder="Nombre"
            regex={/^[A-Z][a-z]+(\s[A-Z][a-z]+)*$/}
            name="nombre"
            actualizarInfo={actualizarInfo}
            establecerError={establecerError}
          ></Input>
          <Input
            tipo="text"
            textoLabel="Apellidos"
            icon={<span className="material-symbols-outlined">person</span>}
            mensajeError="Los apellidos deben ir separados por espcio, iniciando en mayúsculas"
            placeholder="Apellidos"
            name="apellidos"
            actualizarInfo={actualizarInfo}
            establecerError={establecerError}
            regex={/^[A-Z][a-z]+(\s[A-Z][a-z]+)+$/}
          ></Input>
          <Input
            tipo="text"
            textoLabel="Correo Electronico"
            icon={<span className="material-symbols-outlined">email</span>}
            mensajeError="Error con el email, debe contener @ y tener com o es"
            regex={/^[A-Za-z0-9._%+-]+@[a-z]+\.(com|es)$/}
            placeholder="ejemplo@gmail.com"
            name="email"
            actualizarInfo={actualizarInfo}
            establecerError={establecerError}
          ></Input>
          <Input
            tipo="text"
            textoLabel="DNI"
            icon={
              <span className="material-symbols-outlined">credit_card</span>
            }
            mensajeError="Debe ser correcto "
            regex={/^\d{8}[A-Z]$/}
            name="dni"
            actualizarInfo={actualizarInfo}
            establecerError={establecerError}
          ></Input>
          <InputSelect
            options={["Soltero", "Casado", "Otros"]}
            textLabel="Relacion juridica"
            icon={
              <span className="material-symbols-outlined">card_travel</span>
            }
            regex={/^(Soltero|Casado|Otros)$/}
            name="estado"
            actualizarInfo={actualizarInfo}
            establecerError={establecerError}
            mensajeError="Error en el estado, lo sentimo"
          ></InputSelect>
          <Input
            tipo="text"
            textoLabel="Años de servicio"
            icon={
              <span className="material-symbols-outlined">calendar_today</span>
            }
            mensajeError="Debe ser menor que 50 y mayor que 0"
            regex={/^(50|[0-4]?[0-9])$/}
            name="aniosServicio"
            actualizarInfo={actualizarInfo}
            establecerError={establecerError}
          ></Input>

          <div className="flex flex-row gap-2 justify-end w-full col-span-2">
            <Button tipo="secundario" children="Cancelar"></Button>
            <Button tipo="primario" children="Guardar solicitud"></Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
