import { useState } from "react";
import { searchComics } from "../../redux/features/comicSlice";
import { useDispatch, useSelector } from "react-redux";
import style from "./Searchbar.module.css";
import { Toaster, toast } from "react-hot-toast";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";

const Searchbar = () => {
  const [title, setTitle] = useState("");
  const allComics = useSelector((state) => state.comic.allComics);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (!title.length) {
      toast.error("Please enter the title of a comic", {
        position: "top-center",
      });
    }

    const foundComic = allComics.find((comic) =>
      comic.title.toLowerCase().includes(title.toLowerCase())
    );

    if (foundComic) {
      dispatch(searchComics(title));
    } else {
      toast.error(`"${title}" not found, please try again`, {
        position: "top-center",
      });
    }
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
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

      <SavedSearchIcon className={style.btn} onClick={handleSubmit} />
      <Toaster
        toastOptions={{
          style: {
            border: "2px solid #000000",
            fontFamily: "Rubik, sans-serif",
          },
        }}
      />
    </div>
  );
};

export default Searchbar;
