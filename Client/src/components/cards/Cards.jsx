import { Link } from "react-router-dom";
import styles from "./Cards.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../redux/features/cartSlice";
import GradeIcon from "@mui/icons-material/Grade";
import StarIcon from "@mui/icons-material/Star";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Toaster, toast } from "react-hot-toast";
import { selectDarkMode } from "../../redux/features/darkModeSlice";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import {
	fetchFavoritesByUser,
	deleteFavorite,
	createFavorites,
} from "../../redux/features/favoriteSlice";
import axios from "axios";
import { useEffect, useState } from "react";
import base_url from "../../utils/development";

const Cards = ({
	id,
	title,
	description,
	price,
	author,
	image,
	isFavoritePage,
}) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user.user);
	const cart = useSelector((state) => state.cart.cart);
	const items = useSelector((state) => state.comic.allComics);
	const favorites = useSelector((state) => state.favorite.favorites);

	const isComicInFavorites = favorites.some((fav) => fav.id === id);

	useEffect(() => {
		if (user) dispatch(fetchFavoritesByUser(user.id));
	}, []);

	const addToCart = () => {
		const comic = items.find((item) => item.id === id);
		const cartItem = cart.find((item) => item.id === id);

		if (!comic || (cartItem && cartItem.quantity === comic.stock)) {
			toast.error("Item out of stock or maximum quantity reached", {
				position: "bottom-center",
			});
			return;
		}

		dispatch(addItemToCart(comic));
		toast.success("Item added to cart!", { position: "bottom-center" });
	};

	const handleDeleteFavorites = () => {
		dispatch(deleteFavorite({ userId: user.id, comicId: id }))
			.then((res) => {
				if (res.error) {
					toast.error((res.payload && res.payload.message) || res.error, {
						position: "bottom-center",
						id: "error",
					});
				} else {
					dispatch(fetchFavoritesByUser(user.id));
					toast.success("Successfully removed from favorites!", {
						position: "bottom-center",
					});
				}
			})
			.catch((error) => {
				toast.error(
					error.response ? error.response.data.message : error.message,
					{
						duration: 4000,
						position: "top-center",
						id: "error",
					}
				);
			});
	};

	const handleFavoriteClick = () => {
		if (!user) {
			toast.error("You must be logged in to add a favorite", {
				position: "bottom-center",
				id: "error",
			});
			return;
		}

		if (isComicInFavorites) {
			handleDeleteFavorites();
		} else {
			dispatch(createFavorites({ userId: user.id, comicId: id }))
				.then((res) => {
					if (res.error) {
						toast.error(res.payload ? res.payload.message : res.error.message, {
							position: "bottom-center",
							id: "error",
						});
						return;
					}
					dispatch(fetchFavoritesByUser(user.id));
					toast.success("Item saved in favorites!", {
						position: "bottom-center",
						icon: "🌟",
					});
				})
				.catch((error) => {
					toast.error(
						error.response ? error.response.data.message : error.message,
						{
							duration: 4000,
							position: "top-center",
							id: "error",
						}
					);
				});
		}
	};

	const darkMode = useSelector(selectDarkMode);

	return (
		<main className={darkMode ? styles.container : styles.dark}>
			<div className={styles.cardImage}>
				<Link to={`/comic/${id}`}>
					<img
						src={image}
						alt={`imagen de ${title}`}
					/>
				</Link>
			</div>
			<h3>{title}</h3>
			<p>{author}</p>
			<div className={styles.iconsContainer}>
				<b>{price} $</b>
				<div className={styles.icons}>
					<button onClick={addToCart}>
						<ShoppingCartIcon
							className={styles.icon}
							titleAccess="Add to cart"
						/>
					</button>
					<div
						className={styles.icon}
						// className={`${styles.icon} ${
						//   isFavoritePage && isRemoving ? styles.icon : ""
						// }`}
					>
						{isFavoritePage ? (
							<button
								className={styles.deleteButton}
								onClick={handleDeleteFavorites}>
								<DeleteForeverIcon titleAccess="Delete favorite" />
							</button>
						) : (
							<button
								onClick={handleFavoriteClick}
								className={styles.cardButtons}>
								<StarIcon
									titleAccess={isComicInFavorites ? "Delete" : "Save"}
									className={
										isComicInFavorites ? styles.starActive : styles.starIcon
									}
								/>
							</button>
						)}
					</div>
				</div>
			</div>
		</main>
	);
};

export default Cards;
