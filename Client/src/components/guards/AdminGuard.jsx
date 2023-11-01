import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";


function AdminGuard() {
  const admin = useSelector((state) => state.user.admin); 
  const userLogState = useSelector((state) => state.user.logState); 


  if (admin)  return <Outlet />;
  if (!admin)  return <Navigate to={"/admin/login"} />;
  if (userLogState)  return <Navigate to={"/home"} />;


  return <Outlet />;

}

export default AdminGuard;
