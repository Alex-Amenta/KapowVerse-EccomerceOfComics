import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminGuard({ onlogin, redirectTo = "/admin/login" }) {
  const admin = useSelector((state) => state.user.admin);

  if (!admin) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
}

export default AdminGuard;
