import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import Searchbar from "../../components/searchbar/Searchbar";

const Navbar = () => {

  return (
    <nav className={styles.container}>
      <div className={styles.imgContainer}>
      <Link to="/app/home" className={styles.link}>
        <img
          src="https://cdn4.iconfinder.com/data/icons/superhero/400/robin.png"
          alt="Logo de KapowVerse"
        />
        </Link>
      </div>
        <Searchbar />
      <div className={styles.linkContainer}>
        <Link to="/app/home" className={styles.link}>
          Home
        </Link>
        <Link to="/app/comics" className={styles.link}>
          Comics
        </Link>
        <Link to="/app/mangas" className={styles.link}>
          Mangas
        </Link>
        <Link to="/app/create" className={styles.link}>
        Create
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
