import { Link } from "react-router-dom";
import styles from "./NavbarAdmin.module.css";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ComputerIcon from '@mui/icons-material/Computer';
import FaceIcon from '@mui/icons-material/Face';

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
          <ComputerIcon/>Home
        </Link>
        <Link to="/admin/comics" className={styles.link}>
        <ComputerIcon/>Comics
        </Link>
        <Link to="/admin/create" className={styles.link}>
        <ComputerIcon/>Create
        </Link>
        <Link to="/admin/users" className={styles.link}>
        <ComputerIcon/>Users
        </Link>
        <Link to="/admin/sales" className={styles.link}>
        <ComputerIcon/>Sales
        </Link>
        <Link to="/home" className={styles.goBack}>
          <ExitToAppIcon/> Go back
        </Link>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
