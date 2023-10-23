import { Link } from "react-router-dom";
import styles from "./NavbarAdmin.module.css";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const NavbarAdmin = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.imgContainer}>
        <Link to="/admin" className={styles.link}>
          <AdminPanelSettingsIcon style={{width: '4rem', height: 'auto'}}/>
        </Link>
      </div>
      <div className={styles.linkContainer}>
        <Link to="/admin" className={styles.link}>
          Home
        </Link>
        <Link to="/admin/comics" className={styles.link}>
          Comics
        </Link>
        <Link to="/admin/create" className={styles.link}>
          Create
        </Link>
        <Link to="/admin/users" className={styles.link}>
          Users
        </Link>
        <Link to="/admin/sales" className={styles.link}>
          Sales
        </Link>
        <Link to="/home" className={styles.goBack}>
          <ExitToAppIcon/> Go back
        </Link>
      </div>
    </nav>
  );
};

export default NavbarAdmin;
