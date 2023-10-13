import { useState } from "react";
import { searchComics } from "../../redux/features/comicSlice"
import { useDispatch } from "react-redux";
import style from "./Searchbar.module.css";

const Searchbar = () => {

    const [ title, setTitle ] = useState("");
    const dispatch = useDispatch();


    const nameChange = (event) => {
        setTitle(event.target.value)
    }

    const onClickHandler = () => {
        dispatch(searchComics(title))
    }

    const realizarBusqueda = () => {
        dispatch(searchComics(title))
        setTitle("");
      };


    return (
        <div className={style.contenedor}>
            <input type="text" name="title" value={title} onChange={(event)=> nameChange(event)} placeholder="name..." onKeyPress={(event) => {event.key === "Enter" && realizarBusqueda()}}  />
            <button onClick={() => {onClickHandler(); setName("")}} className={style.btn}></button>
        </div>
     );
}
 
export default Searchbar;