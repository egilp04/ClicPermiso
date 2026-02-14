import { useEffect, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import InputSelect from "./InputSelect";
import { supabase } from "../supabase/supabase";
import { idProfesor } from "../utils/Utils";

const Form = () => {
  const [data, setData] = useState({
    nombre: "",
    apellidos: "",
    email: "",
    dni: "",
    estado: "Otros",
    ano_servicio: 0,
  });
  const [error, setError] = useState({
    nombre: false,
    apellidos: false,
    email: false,
    dni: false,
    estado: false,
    ano_servicio: false,
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const { data: responseDatos, error: responseError } = await supabase
        .from("Profesor")
        .select("*")
        .eq("id_profesor", idProfesor);
      if (responseError) throw responseError;
      setData({
        nombre: responseDatos[0].nombre || "",
        apellidos: responseDatos[0].apellidos || "",
        email: responseDatos[0].email || "",
        dni: responseDatos[0].dni || "",
        estado: responseDatos[0].rel_juridica || "",
        ano_servicio: responseDatos[0].ano_servicio || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hadErrors = Object.values(error).some((value) => value == true);
    if (hadErrors) {
      alert("Hay errores, lo sentimos");
    } else {
      await enviarDatos();
      alert("Datos modificados correctamente");
      await getData();
    }
  };

  const enviarDatos = async () => {
    try {
      const { error: responseError } = await supabase
        .from("Profesor")
        .update({
          nombre: data.nombre,
          apellidos: data.apellidos,
          email: data.email,
          dni: data.dni,
          rel_juridica: data.estado,
          ano_servicio: data.ano_servicio,
        })
        .eq("id_profesor", idProfesor);

      if (responseError) throw responseError;
    } catch (error) {
      console.error(error);
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
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: name === "ano_servicio" ? parseInt(value) || 0 : value,
    }));
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
            value={data.nombre}
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
            value={data.apellidos}
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
            value={data.email}
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
            value={data.dni}
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
            value={data.estado}
          ></InputSelect>
          <Input
            tipo="text"
            textoLabel="Años de servicio"
            icon={
              <span className="material-symbols-outlined">calendar_today</span>
            }
            mensajeError="Debe ser menor que 50 y mayor que 0"
            regex={/^(50|[0-4]?[0-9])$/}
            name="ano_servicio"
            actualizarInfo={actualizarInfo}
            establecerError={establecerError}
            value={data.ano_servicio}
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
