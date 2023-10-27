import { Link } from "react-router-dom";
import styles from "./Cards.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../redux/features/cartSlice";
import GradeIcon from "@mui/icons-material/Grade";
import StarIcon from "@mui/icons-material/Star";
import { Toaster, toast } from "react-hot-toast";
import { selectDarkMode } from "../../redux/features/darkModeSlice";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { fetchFavoritesByUser, deleteFavorite } from "../../redux/features/favoriteSlice";
import axios from "axios";


const Cards = ({
  id,
  title,
  description,
  price,
  author,
  image,
  isFavoritePage,
  isAuthenticated,
}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const cart = useSelector((state) => state.cart.cart);
  const items = useSelector((state) => state.comic.allComics);
  const favorites = useSelector((state) => state.favorite.favorites);
  const isComicInFavorites = favorites.some((fav) => fav.comicId === id);
  const [isFavorite, setIsFavorite] = useLocalStorage(`favorite_${id}`, false);
  

  const addToCart = () => {
    const checkStock = items.find((item) => item.id === id);
    let checkCart = cart.find((item) => item.id === id);
    if (
      (!checkCart && checkStock.stock === 0) ||
      checkCart?.quantity === checkStock.stock
    ) {
      return toast.error(
        "You have selected the maximum number of products in stock",
        {
          position: "bottom-center",
        }
      );
    }
    dispatch(
      addItemToCart({
        id,
        title,
        description,
        price,
        author,
        image,
      })
    );
    toast.success("Item added to cart!", { position: "bottom-center" });
  };

  const handleDeleteFavorites = () => {
    const favoriteToDelete = favorites.find((fav) => fav.comicId === id);

    if (favoriteToDelete) {
      dispatch(deleteFavorite(favoriteToDelete.id));
    }
  };

  const handleFavoriteClick = () => {
    if (!user) {
      toast.error("Debes iniciar sesión para agregar a favoritos", {
        position: "bottom-center",
      });
      setTimeout(() => {
        navigate("/signup");

      }, 2500);
      return;
    }

    if (isComicInFavorites) {
      handleDeleteFavorites();
      setIsFavorite(false);
    } else {
      axios
        .post("http://localhost:3001/favorites", {
          userId: user.id,
          comicId: id,
        })
        .then((response) => {
          if (response.status === 201) {
            setIsFavorite(true);
            dispatch(fetchFavoritesByUser(user.id));
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const darkMode = useSelector(selectDarkMode);

  return (
    <main className={darkMode ? styles.container : styles.dark}>
      <div className={styles.cardImage}>
        <Link to={`/comic/${id}`}>
          <img src={image} alt={`imagen de ${title}`} />
        </Link>
      </div>
      <h3>{title}</h3>
      <p>{author}</p>
      <div className={styles.iconsContainer}>
        <b>{price} $</b>
        <div className={styles.icons}>
          <button onClick={addToCart}>
            <ShoppingCartIcon className={styles.icon} />
          </button>
          <div className={`${styles.icon} ${isFavoritePage && isRemoving ? styles.icon : ""}`}>
            {isFavoritePage ? (
              <button className={styles.deleteButton} onClick={handleDeleteFavorites}>
                <DeleteForeverIcon titleAccess="Eliminar" />
              </button>
            ) : (
              <button
                onClick={handleFavoriteClick}
                className={styles.cardButtons}
              >
                {isComicInFavorites ? (
                  <StarIcon titleAccess="Guardar" style={{ color: "yellow" }} />
                ) : (
                  <GradeIcon titleAccess="Dejar de guardar" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Cards;
