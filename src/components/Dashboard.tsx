import { useAuthStore } from "../store/AuthStore";
import { supabase } from "../supabase/supabase";

const Dashboard = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const user = useAuthStore((state) => state.user);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    clearAuth();
  };

  return (
    <div className="flex flex-col gap-6 justify-center items-center mt-6">
      <h1>Bienvenido al Área Privada: {user.user_metadata.full_name} 🥳</h1>
      <p>Solo puedes ver esto si estás logueado.</p>
      <button
        className="p-2 bg-red-800 text-white cursor-pointer rounded-sm"
        onClick={handleLogout}
      >
        Cerrar Sesión
      </button>
    </div>
  );
};

export default Dashboard;
