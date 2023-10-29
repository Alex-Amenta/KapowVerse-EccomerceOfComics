import { useDispatch, useSelector } from "react-redux";
import {
  favoritePublisher,
  favoriteSort,
  resetFilters,
} from "../../redux/features/favoriteSlice";
import { useEffect, useState } from "react";
import styles from "./FilterFavorites.module.css";
import { selectDarkMode } from "../../redux/features/darkModeSlice";

const FilterFavorites = ({
  onFilterChange,
  filterOptions,
  hidePublisherFilter,
  noCategoryComics,
}) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    publisher: "",
    sort: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setInput({
      ...input,
      [name]: value,
    });

    if (name === "sort") {
      dispatch(favoriteSort(value));
    } else if (name === "publisher") {
      dispatch(favoritePublisher(value));
    }
  };

  const handleReset = () => {
    dispatch(resetFilters());
    setInput({ publisher: "", sort: "" });
  };

  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#e8e8e8" : "#15172D";
  }, [darkMode]);

  return (
    <section className={darkMode ? styles.container : styles.dark}>
      <div className={styles.textContainer}>
        Favorites <hr />
      </div>
      <div className={styles.filtersContainer}>
        <select
          className={styles.select}
          id="sort"
          name="sort"
          value={input.sort}
          onChange={handleFilterChange}
        >
          <option value="">Sort By</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
          <option value="precioMin">Lower Price</option>
          <option value="precioMax">Higher price</option>
        </select>
        {!hidePublisherFilter && (
          <select
            className={styles.select}
            id="publisher"
            name="publisher"
            value={input.publisher}
            onChange={handleFilterChange}
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
      </div>
    </section>
  );
};

export default FilterFavorites;
