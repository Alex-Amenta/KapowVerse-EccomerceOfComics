import { useDispatch, useSelector } from "react-redux";
import NavBar from "../navbar/Navbar";
import CardsContainer from "../cards-container/CardsContainer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import styles from "./Favorites.module.css";
import { useEffect, useState } from "react";
import { fetchFavoritesByUser } from "../../redux/features/favoriteSlice";
import FilterFavorites from "../FilterFavorites/FilterFavorites";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { selectDarkMode } from "../../redux/features/darkModeSlice";

const Favorites = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);
	const userId = user ? user.id : null;
	const favorites = useSelector((state) => state.favorite.favorites);
	const isLoading = useSelector((state) => state.favorite.loading);
	const filteredFavorites = useSelector(
		(state) => state.favorite.filteredFavorites
	);

	const filterOptionsForPublisher = ["Marvel", "DC", "Manga"];

	useEffect(() => {
		if (user) dispatch(fetchFavoritesByUser(userId));
	}, [user]);


	const darkMode = useSelector(selectDarkMode);
	useEffect(() => {
		document.body.style.backgroundColor = darkMode ? "#e8e8e8" : "#15172D";
	}, [darkMode]);

	return (
		<>
			<NavBar />
			<div className={styles.container}>
				{isLoading && <div className={styles.loaderDiv}>Loading...</div>}
				{user && favorites.length == 0 ? (
					<div className={styles.notFavorites}>
						<h3 style={darkMode ? { color: "black" } : { color: "white" }}>
							You haven&apos;t added any comics to your favorites yet.
						</h3>
						<NavLink
							to="/home"
							className={styles.link}>
							<AddCircleIcon
								style={
									darkMode
										? { color: "black", fontSize: "3rem" }
										: { color: "white", fontSize: "3rem" }
								}
								titleAccess="Add comics to favorites"
							/>
						</NavLink>
					</div>
				) : null}{" "}
				{/* end user no favorites */}
				{!user && (
					<div
						className={styles.notFavorites}
						style={darkMode ? { color: "black" } : { color: "white" }}>
						<h3>You must log in to see your favorites.</h3>
						<div className={styles.buttonNotfavorites}>
							<Link
								to="/login"
								className={styles.buttonLogIn}>
								Log In
							</Link>
							<Link
								to="/signup"
								className={styles.buttonLogIn}>
								Sign In
							</Link>
						</div>
					</div>
				)}
				{/* end user no login */}
				{user && favorites.length > 0 && (
					<>
						<FilterFavorites
							filterOptions={filterOptionsForPublisher}
							filteredFavorites={filteredFavorites}
						/>
						<section className={styles.sectionFav}>
							<CardsContainer
								allComics={filteredFavorites}
								isFavoritePage={true}
							/>
						</section>
					</>
				)}
			</div>
		</>
	);
};

export default Favorites;
