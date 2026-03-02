import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabase";
import Input from "./Input";
import InputSelect from "./InputSelect";

const Registro = () => {
  const [datos, setDatos] = useState({
    email: "",
    pass: "",
    nombre: "",
    apellidos: "",
    dni: "",
    rel_juridica: "",
    ano_servicio: 0,
  });

  const [errores, setErrores] = useState({
    email: true,
    pass: true,
    nombre: true,
    apellidos: true,
    dni: true,
    rel_juridica: true,
    ano_servicio: true,
  });

  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hayErorres = Object.values(errores).some((error) => error == true);
    if (hayErorres) {
      alert("algunos campos tienen errores");
    } else {
      try {
        const email = datos.email;
        const password = datos.pass;
        const { data } = await supabase
          .from("profiles")
          .select("email")
          .eq("email", email);
        if (data && data?.length > 0) {
          alert("email ya registrado");
          return;
        }

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: `${datos.nombre + " " + datos.apellidos}`,
              nombre: datos.nombre,
              apellidos: datos.apellidos,
              dni: datos.dni,
              rel_juridica: datos.rel_juridica,
              ano_servicio: datos.ano_servicio,
            },
          },
        });
        if (error) throw error;
        await supabase.auth.signOut();
        formRef.current?.reset();
        navigate("/login");
      } catch (error) {
        console.error(error);
      }
    }
  };

  const tieneError = (nombre: string, error: boolean) => {
    setErrores({ ...errores, [nombre]: error });
  };

  const actualizarInfo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const nombre = e.target.name;
    const valor = e.target.value;
    setDatos({ ...datos, [nombre]: valor });
  };

  return (
    <div>
      <h1>Registrarse</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <Input
          placeholder="Introduce tu nombre"
          tipo="text"
          textoLabel="Nombre:"
          actualizarInfo={actualizarInfo}
          tieneError={tieneError}
          name="nombre"
          regex={/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/}
          mensajeError="Formato nombre incorrecto, debe comenzar por mayúsculas"
        ></Input>
        <Input
          placeholder="Introduce tu apellido"
          tipo="text"
          textoLabel="Apellidos:"
          actualizarInfo={actualizarInfo}
          tieneError={tieneError}
          name="apellidos"
          regex={/^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(\s[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)*$/}
          mensajeError="Formato apellidos incorrecto, debe comenzar por mayúsculas"
        ></Input>
        <Input
          placeholder="Introduce tu DNI"
          tipo="text"
          textoLabel="DNI:"
          actualizarInfo={actualizarInfo}
          tieneError={tieneError}
          name="dni"
          regex={/^\d{8}[A-Z]$/}
          mensajeError="Formato dni incorrecto, ocho numeros y una letra"
        ></Input>
        <InputSelect
          options={["Sin seleccionar", "Soltero", "Casado", "Otros"]}
          textLabel="Relacion juridica"
          regex={/^(Soltero|Casado|Otros)$/}
          name="rel_juridica"
          actualizarInfo={actualizarInfo}
          tieneError={tieneError}
          mensajeError="Error en el estado, lo sentimos"
        ></InputSelect>
        <Input
          tipo="text"
          textoLabel="Años de servicio"
          mensajeError="Debe ser menor que 50 y mayor que 0"
          regex={/^(50|[0-4]?[0-9])$/}
          name="ano_servicio"
          actualizarInfo={actualizarInfo}
          tieneError={tieneError}
        ></Input>
        <Input
          placeholder="Introduce un email"
          tipo="text"
          textoLabel="Email:"
          actualizarInfo={actualizarInfo}
          tieneError={tieneError}
          name="email"
          mensajeError="Email inválido, verifique el formato @ y el dominio"
          regex={/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.(com|es)$/}
        ></Input>
        <Input
          name="pass"
          textoLabel="Contraseña:"
          placeholder="Introduce una contraseña"
          tipo="text"
          actualizarInfo={actualizarInfo}
          tieneError={tieneError}
          mensajeError="Contraseña inválida, verifique el formato: mayúsculas, minúsculas, carácter especial: @, !, %..."
          regex={
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          }
        ></Input>
        <button type="submit" className="bg-purple-300">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Registro;
