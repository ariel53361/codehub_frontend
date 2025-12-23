import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

const PrivateRoutes = () => {
  const profile = useAuthStore((s) => s.profile);
  if (!profile) return <Navigate to="/login" />;
  return <Outlet />;
};

export default PrivateRoutes;
