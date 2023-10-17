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
  
  const dispatch = useDispatch();
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const logState = useSelector((state) => state.user.logState);

  return (
    <nav className={styles.container}>
      <div className={styles.imgContainer}>
        <Link to="/home" className={styles.link}>
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
        <Link to="/home" className={styles.link}>
          Home
        </Link>
        <Link to="/comics" className={styles.link}>
          Comics
        </Link>
        <Link to="/mangas" className={styles.link}>
          Mangas
        </Link>
        <Link to="/create" className={styles.link}>
        Create
        </Link>
        {logState ? (
					<>
						<Link
							to="/profile"
							className={styles.link}>
							Profile
						</Link>
						<Link
							onClick={() => {
                localStorage.removeItem("token");
                dispatch(logoutUser());
                window.alert("You have been logged out")
                window.location.href = "/home";
              }}
							className={styles.link}>
							Logout
						</Link>
					</>
				) : (
					<>
						<Link
							to="/signup"
							className={styles.link}>
							Sign Up
						</Link>
						<Link
							to="/login"
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
