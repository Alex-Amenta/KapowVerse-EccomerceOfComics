import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logoOficial from "../../assets/logo-navbar.png";
import Searchbar from "../../components/searchbar/Searchbar";
import { useSelector } from "react-redux";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../redux/features/userSlice";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const logState = useSelector((state) => state.user.logState);
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.container}>
      <div className={styles.imgContainer}>
        <Link to="/app/home" className={styles.link}>
          <img src={logoOficial} alt="Logo de KapowVerse" />
        </Link>
      </div>
      <Searchbar />
      <div className={styles.menuButtonContainer}>
        <button onClick={toggleMenu}>
          <MenuIcon fontSize="large" className={styles.menuButton}/>
        </button>
      </div>
      <div className={menuOpen ? styles.linksMobile : styles.linkContainer}>
        {menuOpen && (
          <button onClick={() => setMenuOpen(false)} >
            <CloseIcon className={styles.closeButton} fontSize="large"/>
          </button>
        )}
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
        {logState ? (
					<>
						<Link
							to="/app/profile"
							className={styles.link}>
							Profile
						</Link>
						<Link
							onClick={() => {
                localStorage.removeItem("token");
                dispatch(logoutUser());
                window.location.href = "/app/";
              }}
							className={styles.link}>
							Logout
						</Link>
					</>
				) : (
					<>
						<Link
							to="/app/signup"
							className={styles.link}>
							Sign Up
						</Link>
						<Link
							to="/app/login"
							className={styles.link}>
							Login
						</Link>
					</>
				)}
      </div>
    </nav>
  );
};

export default Navbar;
