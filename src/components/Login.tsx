import { useRef, useState } from "react";
import { supabase } from "../supabase/supabase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [datos, setDatos] = useState({ email: "", pass: "" });
  const [errores, setErrores] = useState({ email: true, pass: true });
  const [errorLogin, setErrorLogin] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

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

  const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hayErorres = Object.values(errores).some((error) => error == true);
    if (hayErorres) {
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
        setErrorLogin(false);
        formRef.current?.reset();
        navigate("/dashboard");
      } catch (error) {
        console.error(error);
        setErrorLogin(true);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <h1 className="mt-2 text-2xl">LOGIN</h1>
      <form
        onSubmit={handleSumbit}
        ref={formRef}
        className="flex flex-col gap-2"
      >
        <label>Email: </label>
        <input
          placeholder="introduce tu email"
          type="text"
          onChange={actualizarDatos}
          onBlur={manejarErrores}
          className="border border-blue-100 rounded-sm"
          name="email"
        ></input>
        <label>Contraseña: </label>
        <input
          name="pass"
          placeholder="introduce tu contraseña"
          type="password"
          onChange={actualizarDatos}
          onBlur={manejarErrores}
          className="border border-blue-100 rounded-sm"
        ></input>
        <button
          type="submit"
          className="bg-blue-300 cursor-pointer p-2 rounded-sm"
        >
          Entrar
        </button>
      </form>
      {errorLogin && (
        <span className="text-red-600">
          Email y contraseña no coinciden, revise los campos
        </span>
      )}
    </div>
  );
};

export default Login;
