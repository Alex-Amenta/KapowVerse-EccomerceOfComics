import { useState } from "react";
import { searchComics } from "../../redux/features/comicSlice";
import { useDispatch, useSelector } from "react-redux";
import style from "./Searchbar.module.css";
import { Toaster, toast } from "react-hot-toast";
import imageAlert from "../../assets/murcielagos.png";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import SearchClose from "@mui/icons-material/Close"
import { resetSearch } from "../../redux/features/comicSlice";

const Searchbar = () => {
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
    <div className={style.container}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Search for title..."
      />

      {title.length > 0 && <SearchClose className={style.btn} onClick={handleReset} />}
      <SavedSearchIcon className={style.btn} onClick={handleSubmit} />
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

export default Searchbar;
