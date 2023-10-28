import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function AdminGuard({ redirectTo = "/admin/login" }) {
  const user = useSelector((state) => state.user.allUsers);
  const filterAdmin = user.filter(user => user.role === "admin");

  if (filterAdmin.length === 0) {
    return <Navigate to={redirectTo} />;
  }

  return <Outlet />;
}

export default AdminGuard;
