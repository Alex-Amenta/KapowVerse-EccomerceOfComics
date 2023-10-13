import { Link, useLocation } from "react-router-dom";
import styles from "./Navbar.module.css";
import Searchbar from "../../components/searchbar/Searchbar";

const Navbar = () => {
  // const { pathname } = useLocation();

  // const textFromSection =
  //   pathname === "/comics"
  //     ? "comics"
  //     : pathname === "/mangas"
  //     ? "mangas"
  //     : null;

  return (
    <nav className={styles.container}>
      <div className={styles.imgContainer}>
      <Link to="/home" className={styles.link}>
        <img
          src="https://cdn4.iconfinder.com/data/icons/superhero/400/robin.png"
          alt="Logo de KapowVerse"
        />
        </Link>
      </div>
        <Searchbar />
      {/* <div className={styles.textContainer}>{textFromSection}</div> */}
      <div className={styles.linkContainer}>
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
        <Link to="/create" className={styles.link}>
        Create
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
