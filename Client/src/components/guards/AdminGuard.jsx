import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
// import { logUserByLocalStorage } from "../../redux/features/userSlice";

function AdminGuard() {
  const admin = useSelector((state) => state.user.admin); 
  const userLogState = useSelector((state) => state.user.logState); 
  // if (localStorage.getItem("userlog")) {
  //   logUserByLocalStorage(JSON.parse(localStorage.getItem("userlog")));
  // }

  if (admin)  return <Outlet />;
  if (!admin)  return <Navigate to={"/admin/login"} />;
  if (userLogState)  return <Navigate to={"/home"} />;


  return <Outlet />;

  // const user = useSelector((state) => state.user.allUsers);
  // const filterAdmin = user.filter(user => user.role === "admin");

  // if (filterAdmin.length === 0) {
  //   return <Navigate to={ "/admin/login" } />;
  // }

  // return <Outlet />;


}

export default AdminGuard;
