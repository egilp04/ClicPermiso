import { useRef, useState } from "react";
import { supabase } from "../supabase/supabase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [datos, setDatos] = useState({ email: "", pass: "" });
  const [errores, setErrores] = useState({ email: true, pass: true });
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const manejarErrores = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nombre = e.target.name;
    const valor = e.target.value;
    if (valor == null || valor.trim() == "") {
      console.log("nombre con error", nombre);
      setErrores({ ...errores, [nombre]: true });
    } else {
      console.log("nombre sin error", nombre);
      setErrores({ ...errores, [nombre]: false });
    }
  };

  const actualizarDatos = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nombre = e.target.name;
    const valor = e.target.value;
    setDatos({ ...datos, [nombre]: valor });
  };

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hayErorres = Object.values(errores).some((error) => error == true);
    if (hayErorres) {
      console.log(errores);
      alert("algunos campos tienen errores");
    } else {
      try {
        const email = datos.email;
        const password = datos.pass;
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;
        formRef.current?.reset();
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={handleSumbit} ref={formRef}>
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
          Entrar
        </button>
      </form>
    </div>
  );
};

export default Login;
