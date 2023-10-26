import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logoOficial from "../../assets/logo-navbar.png";
import Searchbar from "../../components/searchbar/Searchbar";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Logged from "../logged/Logged";
import {
  selectDarkMode,
  toggleDarkMode,
} from "../../redux/features/darkModeSlice";
import reactorOff from "../../assets/reactor-off.png";
import reactorOn from "../../assets/reactor-on.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const logState = useSelector((state) => state.user.logState);

  const darkMode = useSelector(selectDarkMode);
  const dispatch = useDispatch();

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <nav className={darkMode ? styles.container : styles.dark}>
      <div className={styles.imgContainer}>
        <Link to="/home" className={styles.link}>
          <img src={logoOficial} alt="Logo de KapowVerse" />
        </Link>
      </div>
      <Searchbar />
      <div className={styles.menuButtonContainer}>
        <button onClick={toggleMenu}>
          <MenuIcon fontSize="large" className={styles.menuButton} />
        </button>
      </div>
      <div className={menuOpen ? styles.linksMobile : styles.linkContainer}>
        {menuOpen && (
          <button onClick={() => setMenuOpen(false)}>
            <CloseIcon className={styles.closeButton} fontSize="large" />
          </button>
        )}
        <Link
          to="/home"
          className={styles.link}
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to="/comics"
          className={styles.link}
          onClick={() => setMenuOpen(false)}
        >
          Comics
        </Link>
        <Link
          to="/mangas"
          className={styles.link}
          onClick={() => setMenuOpen(false)}
        >
          Mangas
        </Link>
        {logState ? (
          <>
            <Logged onClick={() => setMenuOpen(false)} />
          </>
        ) : (
          <>
            <Link
              to="/signup"
              className={styles.link}
              onClick={() => setMenuOpen(false)}
            >
              Sign Up
            </Link>
          </>
        )}
        <button onClick={handleToggleDarkMode} className={styles.buttonTheme}>
          <img src={darkMode ? reactorOff : reactorOn} />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
