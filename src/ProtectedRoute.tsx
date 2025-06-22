import { Navigate, Outlet } from "react-router-dom";
import { NotFound } from "./pages";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const role = localStorage.getItem("role");

  if (!role) return <Navigate to="/" />;
  if (!allowedRoles.includes(role)) return <div>
    <div>
      <NotFound msg={true}/>
    </div>
  </div>;

  return <Outlet />;
};

export default ProtectedRoute;