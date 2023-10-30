import { useDispatch, useSelector } from "react-redux";
import {
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
  const InitialCreate = {
    publisher: "",
    sort: "",
    category: "",
  };
  const [input, setInput] = useState(InitialCreate);

  const handleSort = (event) => {
    setInput({ ...input, sort: event.target.value });
    dispatch(
      favoriteSort({
        sortBy: event.target.value,
        category: input.category,
        publisher: input.publisher,
      })
    );
  };

  const handleCategory = (event) => {
    setInput({ ...input, category: event.target.value });
    dispatch(
      favoriteSort({
        category: event.target.value,
        sortBy: input.sort,
        publisher: input.publisher,
      })
    );
  };

  const handlePublisher = (event) => {
    setInput({ ...input, publisher: event.target.value });
    dispatch(
      favoriteSort({
        publisher: event.target.value,
        sortBy: input.sort,
        category: input.category,
      })
    );
  };

  const handleReset = () => {
    dispatch(resetFilters());
    setInput(InitialCreate);
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

        <button className={styles.buttonReset} onClick={handleReset}>
          Reset Filters
        </button>
      </div>
    </section>
  );
};

export default FilterFavorites;
