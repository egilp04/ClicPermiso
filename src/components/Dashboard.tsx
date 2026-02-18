import { useAuthStore } from "../store/AuthStore";
import { supabase } from "../supabase/supabase";

const Dashboard = () => {
  //????
  const signOut = useAuthStore((state) => state.signOut);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    signOut();
  };

  return (
    <div>
      <h1>Bienvenido al Área Privada 🥳</h1>
      <p>Solo puedes ver esto si estás logueado.</p>
      <button onClick={handleLogout}>Cerrar Sesión</button>
    </div>
  );
};

export default Dashboard;
