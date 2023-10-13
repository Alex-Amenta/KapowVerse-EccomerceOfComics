import { useState } from "react";
import { searchComics } from "../../redux/features/comicSlice";
import { useDispatch } from "react-redux";
import style from "./Searchbar.module.css";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";

const Searchbar = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const nameChange = (event) => {
    setTitle(event.target.value);
  };

  const onClickHandler = () => {
    dispatch(searchComics(title));
  };

  const realizarBusqueda = () => {
    dispatch(searchComics(title));
    setTitle("");
  };

  return (
    <div className={style.contenedor}>
      <input
        type="text"
        name="title"
        value={title}
        onChange={(event) => nameChange(event)}
        placeholder="Search for title..."
        onKeyPress={(event) => {
          event.key === "Enter" && realizarBusqueda();
        }}
      />

      <SavedSearchIcon
        className={style.btn}
        onClick={() => {
          onClickHandler();
          setName("");
        }}
      />
    </div>
  );
};

export default Searchbar;
