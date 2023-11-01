import { useEffect, useState } from "react";
import { searchComics } from "../../redux/features/comicSlice";
import { useDispatch, useSelector } from "react-redux";
import style from "./Searchbar.module.css";
import { toast } from "react-hot-toast";
import SavedSearchIcon from "@mui/icons-material/SavedSearch";
import SearchClose from "@mui/icons-material/Close";
import { resetSearch } from "../../redux/features/comicSlice";
import { useDebounce } from "../../hooks/useDebounce";

const Searchbar = () => {
	const [title, setTitle] = useState("");
	const comicsCopy = useSelector((state) => state.comic.comicsCopy);
	const dispatch = useDispatch();
	const variable = useDebounce(title, 300);

	const handleSubmit = () => {
		const foundComic = comicsCopy.find((comic) =>
			comic.title.toLowerCase().includes(title.toLowerCase())
		);

		if (foundComic) {
			dispatch(searchComics(title));
		} else {
			toast.error(`"${title}" not found, please try again`, {
				position: "bottom-center",
				id: "toastId2",
			});
		}
	};

	const handleReset = () => {
		setTitle("");
		dispatch(resetSearch());
	};


	useEffect(() => {
		handleSubmit();
	}, [variable]);



	return (
		<div className={style.container}>
			<SavedSearchIcon />
			<input
				type="text"
				name="title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Search for title..."
			/>

			{title.length > 0 && (
				<SearchClose
					className={style.btn}
					onClick={handleReset}
				/>
			)}
		</div>
	);
};

export default Searchbar;
