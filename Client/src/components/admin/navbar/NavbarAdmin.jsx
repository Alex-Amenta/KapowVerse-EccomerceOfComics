import { Link } from "react-router-dom";
import styles from "./NavbarAdmin.module.css";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ComputerIcon from '@mui/icons-material/Computer';
import FaceIcon from '@mui/icons-material/Face';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AssignmentIcon from '@mui/icons-material/Assignment';
import BarChartIcon from '@mui/icons-material/BarChart';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const NavbarAdmin = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.imgContainer}>
        <Link to="/admin" className={styles.linkAdmin}>
          <FaceIcon style={{width: '3.6rem', height: 'auto'}}/>
          <div className={styles.adminVerify}>
            <p>Admin</p>
            <p className={styles.verified}><VerifiedUserIcon style={{width: "14px"}} color="success"/>Verified</p>
          </div>
        </Link> <hr />
      </div>
      <div className={styles.linkContainer}>
        <Link to="/admin" className={styles.link}>
          <BarChartIcon/>Statistics
        </Link>
        <Link to="/admin/comics" className={styles.link}>
        <AssignmentIcon/>Products
        </Link>
        <Link to="/admin/create" className={styles.link}>
        <AddCircleIcon/>Add Product
        </Link>
        <Link to="/admin/users" className={styles.link}>
        <PeopleAltIcon/>Users
        </Link>
        <Link to="/admin/sales" className={styles.link}>
        <TrendingUpIcon/>Sales
        </Link>
        <Link to="/home" className={styles.goBack}>
          <ExitToAppIcon/> Go back
        </Link>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
