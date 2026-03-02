import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

const Protected = () => {
  const session = useAuthStore((state) => state.session);
  const loading = useAuthStore((state) => state.loading);

  if (loading) return <div>Cargando autenticación...</div>;
  if (!session) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default Protected;
