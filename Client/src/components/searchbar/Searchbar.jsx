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
  
  const pathname = window.location.pathname;
  if (
    pathname.includes("signup") || 
    pathname.includes("login") || 
    pathname.includes("edituser") ||
    pathname.includes("profile")  ||
    pathname.includes("edit")  ||
    pathname.includes("favorites") ||
    pathname.includes("purchases")
    
    ) return null;
  



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
        onKeyDown ={handleKeyPress}
        placeholder="Search for title..."
      />

      {title.length > 0 && <SearchClose className={style.btn} onClick={handleReset} />}
      <SavedSearchIcon className={style.btn} onClick={handleSubmit} />
      
    </div>
  );
};

export default Searchbar;
