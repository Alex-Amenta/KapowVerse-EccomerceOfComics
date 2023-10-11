import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.container}>
      <Link to="/home" className={styles.link}>
        Home
      </Link>
      <Link to="/comics" className={styles.link}>
        Comics
      </Link>
      <Link to="/mangas" className={styles.link}>
        Mangas
      </Link>
      <Link to="/about" className={styles.link}>
        About us
      </Link>
    </nav>
  );
};

export default Navbar;
