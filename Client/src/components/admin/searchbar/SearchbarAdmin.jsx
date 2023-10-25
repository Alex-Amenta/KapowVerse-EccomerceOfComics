import { useDispatch, useSelector } from "react-redux";
import { resetSearch, searchComics } from "../../../redux/features/comicSlice";
import styles from "./SearchbarAdmin.module.css";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import { Toaster, toast } from "react-hot-toast";
import imageAlert from "../../../assets/murcielagos.png";
import SearchClose from "@mui/icons-material/Close"
import { useState } from "react";

const SearchbarAdmin = () => {
  const [title, setTitle] = useState("");
  const comicsCopy = useSelector((state) => state.comic.comicsCopy);
  const dispatch = useDispatch();
  const handleSubmit = () => {
    if (!title.length) {
      toast.error("Please enter the title of a comic", {
        position: "top-center",
        id: "toastId",
      });
      return;
    }

    const foundComic = comicsCopy.find((comic) =>
      comic.title.toLowerCase().includes(title.toLowerCase())
    );

    if (foundComic) {
      dispatch(searchComics(title));
    } else {
      toast.error(`"${title}" not found, please try again`, {
        position: "top-center",
        id: "toastId2",
      });
    }
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };

  const handleReset = () => {
    setTitle("");
    dispatch(resetSearch());
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search for title..."
      />

      {title.length > 0 && (
        <SearchClose className={styles.btn} onClick={handleReset} />
      )}
      <SavedSearchIcon className={styles.btn} onClick={handleSubmit} />
      <Toaster
        toastOptions={{
          style: {
            border: "2px solid #000000",
            fontWeight: "bold",
            fontFamily: "Rubik, sans-serif",
            backgroundImage: `url(${imageAlert})`,
            backgroundSize: "cover",
            backgroundPosition: "right",
            backgroundRepeat: "no-repeat",
          },
        }}
      />
    </div>
  );
};

export default SearchbarAdmin;
