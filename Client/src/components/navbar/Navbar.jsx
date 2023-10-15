import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import Searchbar from "../../components/searchbar/Searchbar";
import { useSelector } from "react-redux";

const Navbar = () => {
	const logState = useSelector((state) => state.user.logState);
	return (
		<nav className={styles.container}>
			<div className={styles.imgContainer}>
				<Link
					to="/home"
					className={styles.link}>
					<img
						src="https://cdn4.iconfinder.com/data/icons/superhero/400/robin.png"
						alt="Logo de KapowVerse"
					/>
				</Link>
			</div>
			<Searchbar />
			<div className={styles.linkContainer}>
				<Link
					to="/home"
					className={styles.link}>
					Home
				</Link>
				<Link
					to="/comics"
					className={styles.link}>
					Comics
				</Link>
				<Link
					to="/mangas"
					className={styles.link}>
					Mangas
				</Link>
				<Link
					to="/create"
					className={styles.link}>
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
							to="/logout"
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
