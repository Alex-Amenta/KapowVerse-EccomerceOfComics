/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterAndSort, resetFilters } from "../../redux/features/comicSlice";
import styles from "./Filters.module.css";
import { Link, useLocation } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GradeIcon from "@mui/icons-material/Grade";
import Modal from "react-modal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Cart from "../cart/Cart";
import { selectDarkMode } from "../../redux/features/darkModeSlice";
import PropTypes from "prop-types";

const InitialCreate = {
  category: "",
  publisher: "",
  sort: "",
};

const customModalStyles = {
  content: {
    width: "35%",
    margin: "0 auto",
    right: "-50%",
    height: "100%",
    top: "0",
    left: "auto",
    borderRadius: "0",
    animation: "slideIn 0.5s ease-in-out",
    zIndex: "1"
  },
};

const Filters = ({
  onFilterChange,
  filterOptions,
  hidePublisherFilter,
}) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const itemQuantity = useSelector((state) => state.cart.itemQuantity);
  const [input, setInput] = useState(InitialCreate);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const allCategories = useSelector((state) => state.category.allCategory);
  const isSearch = useSelector((state) => state.comic.search);
  const textFromSection =
    pathname === "/comics"
      ? "comics"
      : pathname === "/mangas"
      ? "mangas"
      : "Explore Our Diverse Collection!";

  const openModal = () => {
    customModalStyles.content.right = "0";
    setModalIsOpen(true);
  };

  const closeModal = () => {
    customModalStyles.content.right = "-50%";
    setModalIsOpen(false);
  };

  const handleSort = (event) => {
    setInput({ ...input, sort: event.target.value });
    dispatch(
      filterAndSort({
        sortBy: event.target.value,
        category: input.category,
        publisher: input.publisher,
      })
    );
    onFilterChange();
  };

  const handleCategory = (event) => {
    setInput({ ...input, category: event.target.value });
    dispatch(
      filterAndSort({
        category: event.target.value,
        sortBy: input.sort,
        publisher: input.publisher,
      })
    );
    onFilterChange();
  };

  const handlePublisher = (event) => {
    setInput({ ...input, publisher: event.target.value });
    dispatch(
      filterAndSort({
        publisher: event.target.value,
        sortBy: input.sort,
        category: input.category,
      })
    );
    onFilterChange();
  };

  const handleReset = () => {
    dispatch(resetFilters());
    setInput(InitialCreate);
  };

  // Restablecer los filtros si la sección cambia
  useEffect(() => {
    setInput(InitialCreate);
    dispatch(resetFilters());
  }, [pathname, isSearch]);

  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#e8e8e8" : "#15172D";
  }, [darkMode]);


  return (
    <section className={darkMode ? styles.container : styles.dark}>
      <div
        className={`${styles.textContainer} ${
          textFromSection === "Explore Our Diverse Collection!"
            ? styles.lastMessage
            : ""
        }`}
      >
        {textFromSection} <hr />
      </div>
      <div className={styles.filtersContainer}>
        <select
          className={styles.select}
          id="sort"
          name="sort"
          value={input.sort}
          onChange={handleSort}
          aria-label="sort by filter"
        >
          <option value="">Sort By</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="precioMin">Lower Price</option>
          <option value="precioMax">Higher price</option>
        </select>
        <select
          className={styles.select}
          id="category"
          name="category"
          value={input.category}
          onChange={handleCategory}
          aria-label="category filter"
        >
          <option value="">Category</option>
          {allCategories.map((category) => (
            <option key={category.name} value={category.name}>
              {category.name}
            </option>
          ))}

        </select>
        {!hidePublisherFilter && (
          <select
            className={styles.select}
            id="publisher"
            name="publisher"
            value={input.publisher}
            onChange={handlePublisher}
            aria-label="publisher filter"
          >
            <option value="">Publisher</option>
            {filterOptions.map((publisher) => (
              <option key={publisher} value={publisher}>
                {publisher}
              </option>
            ))}
          </select>
        )}

        <button className={styles.buttonReset} onClick={handleReset}>
          Reset Filters
        </button>
        <div className={styles.buttonsContainer}>
          <button onClick={openModal}>
            <Badge badgeContent={itemQuantity} showZero color="error">
              <ShoppingCartIcon fontSize="large" className={styles.cartIcon} />
            </Badge>
          </button>
          <button aria-label="go to favorites">
            <Link to="/favorites" aria-label="go to favorites">
              <GradeIcon fontSize="large" className={styles.starIcon}/>
            </Link>
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Carrito de Compras"
        ariaHideApp={false}
        style={customModalStyles}
        overlayClassName={darkMode ? "" : styles.dark__cart__overlay}
        className={darkMode ? "" : styles.dark__cart}
      >
        <button className={styles.closeModal} onClick={closeModal}>
          <ArrowBackIcon />
        </button>
        <p className={styles.shoppingTittle}>Your shopping cart</p>
        <div>
          <Cart />
        </div>
      </Modal>
    </section>
  );
};


Filters.propTypes = {
  filterOptions: PropTypes.array,
  onFilterChange: PropTypes.func.isRequired,
  hidePublisherFilter: PropTypes.bool,
};

export default Filters;
