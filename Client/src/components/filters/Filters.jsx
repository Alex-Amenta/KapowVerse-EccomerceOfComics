import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterAndSort, resetFilters } from "../../redux/features/comicSlice";
import styles from "./Filters.module.css";
import { useLocation } from "react-router-dom";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import GradeIcon from "@mui/icons-material/Grade";
import Modal from "react-modal";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Cart from "../cart/Cart";

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
  noCategoryComics,
}) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const itemQuantity = useSelector((state) => state.cart.itemQuantity);
  const [input, setInput] = useState(InitialCreate);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
  }, [pathname]);

  return (
    <section className={styles.container}>
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
        >
          <option value="">Category</option>
          <option value="Superheroes">Superheroes</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Adventure">Adventure</option>
          <option value="Action">Action</option>
          <option value="Horror">Horror</option>
          <option value="Mystery">Mystery</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Romance">Romance</option>
          <option value="Suspense">Suspense</option>
        </select>
        {!hidePublisherFilter && (
          <select
            className={styles.select}
            id="publisher"
            name="publisher"
            value={input.publisher}
            onChange={handlePublisher}
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
          <button>
            <GradeIcon fontSize="large" className={styles.starIcon} />
          </button>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Carrito de Compras"
        ariaHideApp={false}
        style={customModalStyles}
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

export default Filters;
