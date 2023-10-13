import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  comicSort,
  filterByCategory,
  filterByPublisher,
  resetFilters,
} from "../../redux/features/comicSlice";
import styles from "./Filters.module.css";

const InitialCreate = {
  category: "",
  publisher: "",
  sort: "",
};

const Filters = ({ onFilterChange }) => {
  const [input, setInput] = useState(InitialCreate);
  const dispatch = useDispatch();

  const handleSort = (event) => {
    setInput({ ...input, sort: event.target.value });
    dispatch(comicSort(event.target.value));
    onFilterChange()
  };

  const handleCategory = (event) => {
    setInput({ ...input, category: event.target.value });
    dispatch(filterByCategory(event.target.value));
    onFilterChange()
  };

  const handlePublisher = (event) => {
    setInput({ ...input, publisher: event.target.value });
    dispatch(filterByPublisher(event.target.value));
    onFilterChange()
  };

  const handleReset = () => {
    dispatch(resetFilters());
    setInput(InitialCreate);
  };

  return (
    <div className={styles.selectContainer}>
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
        <option value="Marvel">Marvel</option>
        <option value="DC">DC</option>
        <option value="Manga">Manga</option>
      </select>
      <button className={styles.buttonReset} onClick={handleReset}>
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;
