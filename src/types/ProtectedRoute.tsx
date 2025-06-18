import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const role = localStorage.getItem("role");

  if (!role) return <Navigate to="/" />;
  if (!allowedRoles.includes(role)) return <Navigate to="/unauthorized" />;

  return <Outlet />;
};

export default ProtectedRoute;