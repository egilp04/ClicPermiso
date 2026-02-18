import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase/supabase";

const Registro = () => {
  const [datos, setDatos] = useState({ email: "", pass: "" });
  const [errores, setErrores] = useState({ email: true, pass: true });
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

        console.log(data);
        if (data && data?.length > 0) {
          console.log("email ya registrado");
          alert("email ya reigtado");
          return;
        }

        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        formRef.current?.reset();
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const manejarErrores = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nombre = e.target.name;
    const valor = e.target.value;
    if (valor == null || valor.trim() == "") {
      setErrores({ ...errores, [nombre]: true });
    } else {
      setErrores({ ...errores, [nombre]: false });
    }
  };

  const actualizarDatos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nombre = e.target.name;
    const valor = e.target.value;
    setDatos({ ...datos, [nombre]: valor });
  };

  return (
    <div>
      <h1>Página de registro</h1>
      <form onSubmit={handleSubmit} ref={formRef}>
        <label>Email: </label>
        <input
          placeholder="introduce tu email"
          type="text"
          onChange={actualizarDatos}
          onBlur={manejarErrores}
          className="border border-amber-700"
          name="email"
        ></input>
        <label>Contraseña: </label>
        <input
          name="pass"
          placeholder="introduce tu contraseña"
          type="text"
          onChange={actualizarDatos}
          onBlur={manejarErrores}
          className="border border-amber-700"
        ></input>
        <button type="submit" className="bg-purple-300">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Registro;
