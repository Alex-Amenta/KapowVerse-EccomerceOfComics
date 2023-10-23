import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminGuard({ redirectTo = "/admin/login" }) {
  const user = useSelector((state) => state.user.admin);

  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
}

export default AdminGuard;
