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
    <div>
      <h1>LOGIN</h1>
      <form onSubmit={handleSumbit} ref={formRef}>
        <label>Email: </label>
        <input
          placeholder="introduce tu email"
          type="text"
          onChange={actualizarDatos}
          onBlur={manejarErrores}
          className="border border-amber-100"
          name="email"
        ></input>
        <label>Contraseña: </label>
        <input
          name="pass"
          placeholder="introduce tu contraseña"
          type="password"
          onChange={actualizarDatos}
          onBlur={manejarErrores}
          className="border border-amber-100"
        ></input>
        <button type="submit" className="bg-purple-300">
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
