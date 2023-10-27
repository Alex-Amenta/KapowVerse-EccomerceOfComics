import { useDispatch, useSelector } from "react-redux";
import NavBar from "../navbar/Navbar";
import CardsContainer from "../cards-container/CardsContainer";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import styles from "./Favorites.module.css";
import { useEffect } from "react";
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

  const dataComics = favorites.map((f) => f.comic);
  const filteredDataComics = filteredFavorites.map((f) => f.comic);
  const comicsToDisplay =
    filteredFavorites.length > 0 ? filteredDataComics : dataComics;

  useEffect(() => {
    if (user) {
      dispatch(fetchFavoritesByUser(userId));
    }
  }, [dispatch, filteredFavorites]);

  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#e8e8e8" : "#15172D";
  }, [darkMode]);

  return (
    <>
      <NavBar />
      <div className={styles.container}>
        {dataComics.length > 0 && (
          <FilterFavorites filterOptions={filterOptionsForPublisher} dataComics={dataComics}/>
        )}
        {isLoading ? (
          <div className={styles.loaderDiv}>Loading...</div>
        ) : dataComics.length === 0 && !isLoading ? (
          user ? (
            <div className={styles.notFavorites}>
              <h3>You haven't added any comics to your favorites yet.</h3>
              <NavLink to="/home" className={styles.link}>
                <AddCircleIcon
                  style={{ fontSize: "3rem" }}
                  titleAccess="Add comics to favorites"
                />
              </NavLink>
            </div>
          ) : (
            <div className={styles.notFavorites}>
              <h3>You must log in to see your favorites.</h3>
              <div className={styles.buttonNotfavorites}>
                <Link to="/login" className={styles.buttonLogIn}>
                  Log In
                </Link>
                <Link to="/signup" className={styles.buttonLogIn}>
                  Sign In
                </Link>
              </div>
            </div>
          )
        ) : (
          <section className={styles.sectionFav}>
            <CardsContainer allComics={comicsToDisplay} isFavoritePage={true} />
          </section>
        )}
      </div>
    </>
  );
};

export default Favorites;
