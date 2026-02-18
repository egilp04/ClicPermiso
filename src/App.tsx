import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Diurno from "./components/Diurno";
import { useAuthStore } from "./store/AuthStore";
import { useEffect } from "react";
import { supabase } from "./supabase/supabase";
import Protected from "./pages/Protected";
import Dashboard from "./components/Dashboard";
import Registro from "./components/Registro";
import Login from "./components/Login";

function App() {
  const setSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, [setSession]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home></Home>}>
          <Route index element={<Diurno></Diurno>}></Route>
          <Route path="vespertino"></Route>
          <Route path="perfil"></Route>
          <Route path="dias-solicitados"></Route>
          <Route path="ausencias"></Route>
          <Route path="registrarse" element={<Registro></Registro>}></Route>
          <Route path="login" element={<Login></Login>}></Route>
          <Route element={<Protected></Protected>}>
            <Route path="dashboard" element={<Dashboard></Dashboard>} />
          </Route>{" "}
        </Route>
      </Routes>
    </>
  );
}

export default App;
