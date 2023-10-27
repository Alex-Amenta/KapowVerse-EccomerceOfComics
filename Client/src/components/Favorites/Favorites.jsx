import { useDispatch, useSelector } from "react-redux";
import NavBar from "../navbar/Navbar";
import CardsContainer from "../cards-container/CardsContainer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import styles from "./Favorites.module.css";
import { useEffect } from "react";
import { fetchFavoritesByUser } from "../../redux/features/favoriteSlice";
import FilterFavorites from "../FilterFavorites/FilterFavorites";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Favorites = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const favorites = useSelector((state) => state.favorite.favorites);
  const isLoading = useSelector((state) => state.favorite.loading);
  const filteredFavorites = useSelector(
    (state) => state.favorite.filteredFavorites
  );

  const dataComics = favorites.map((f) => f.Comic);
  const filteredDataComics = filteredFavorites.map((f) => f.Comic);
  const comicsToDisplay =
    filteredFavorites.length > 0 ? filteredDataComics : dataComics;


  useEffect(() => {
    dispatch(fetchFavoritesByUser(user.id));
  }, [dispatch, filteredFavorites]);

  return (
    <div className={styles.container}>
    <div className={styles.searchNavContainer}>
      <div className={styles.navBar}>
        <NavBar />
      </div>
    </div>
      {dataComics.length > 0 && <FilterFavorites />}
      {isLoading ? (
        <div className={styles.loaderDiv}>
          CARGANDO...
        </div>
      ) : dataComics.length === 0 && !isLoading ? (
        user ? (
          <div className={styles.notFavorites}>
            <h3>Todavia no has agregado ningun comic a tus favoritos.</h3>
            <NavLink to="/home" className={styles.link}>
              <AddCircleIcon
                fontSize="medium"
                titleAccess="Agregar comics a favoritos"
              />
            </NavLink>
          </div>
        ) : (
          <div className={styles.notFavorites}>
            <h3>Inicia sesion para agregar productos a favoritos.</h3>
            <Link
              to="/login"
              className={styles.buttonLogIn}
            >
              Iniciar sesion
            </Link>
          </div>
        )
      ) : (
        <CardsContainer allComics={comicsToDisplay} isFavoritePage={true} />
      )}
    </div>
  );
};

export default Favorites;
