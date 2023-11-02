import { Link, NavLink } from "react-router-dom";
import styles from "./NavbarAdmin.module.css";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import FaceIcon from "@mui/icons-material/Face";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BarChartIcon from "@mui/icons-material/BarChart";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import CategoryIcon from '@mui/icons-material/Category';
// import { useDispatch } from "react-redux";
// import { logoutUser } from "../../../redux/features/userSlice";

const NavbarAdmin = () => {
  // const dispatch = useDispatch();

  // const handleLogout = () => {
  //   toast(
  //     <div className={styles.containerToast}>
  //       <p>&#128680; You are about to disconnect, are you sure?</p>
  //       <div className={styles.toastButtons}>
  //         <button
  //           onClick={() => {
  //             localStorage.removeItem("userlog");
  //             dispatch(logoutUser());
  //             toast.dismiss();
  //           }}
  //         >
  //           Accept
  //         </button>
  //         <button onClick={() => toast.dismiss()}>Cancel</button>
  //       </div>
  //     </div>,
  //     { duration: 20000 }
  //   );
  // };

  return (
    <nav className={styles.container}>
      <div className={styles.imgContainer}>
        <Link to="/admin" className={styles.linkAdmin}>
          <FaceIcon style={{ width: "3.6rem", height: "auto" }} />
          <div className={styles.adminVerify}>
            <p>Admin</p>
            <p className={styles.verified}>
              <VerifiedUserIcon style={{ width: "14px" }} color="success" />
              Verified
            </p>
          </div>
        </Link>{" "}
        <hr />
      </div>
      <div className={styles.linkContainer}>
        <NavLink
          end
          to="/admin"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          <BarChartIcon />
          Statistics
        </NavLink>
        <NavLink
          end
          to="/admin/comics"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          <AssignmentIcon />
          Products
        </NavLink>
        <NavLink
          end
          to="/admin/create"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          <AddCircleIcon />
          Add Product
        </NavLink>
        <NavLink
          end
          to="/admin/users"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          <PeopleAltIcon />
          Users
        </NavLink>
        <NavLink
          end
          to="/admin/categories"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          <CategoryIcon />
          Categories
        </NavLink>
        <NavLink 
        // onClick={handleLogout}
         to="/home" className={styles.goBack}>
          <ExitToAppIcon /> Go back
        </NavLink>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
