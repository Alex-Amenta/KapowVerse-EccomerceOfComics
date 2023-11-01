import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import NavbarAdmin from "../navbar/NavbarAdmin";
import { useState } from "react";
import { toast } from "react-hot-toast";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import styles from "./EditComic.module.css";
import { updateComic } from "../../../redux/features/comicSlice";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const initialFormData = {
	title: "",
	description: "",
	price: 0,
	categories: [],
	author: "",
	image: "",
	stock: 0,
	publisher: "",
};

const initialError = {
	title: "",
	description: "",
	price: "",
	categories: "",
	author: "",
	image: "",
	stock: "",
	publisher: "",
};

const publishers = ["Marvel", "DC", "Manga"];

const EditComic = () => {
	const categories = useSelector((state) => state.category.allCategory);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const comics = useSelector((state) => state.comic.allComics);
	const { id } = useParams();
	const comicToEdit = comics.find((comic) => comic.id === id);
	const [error, setError] = useState(initialError);
	const [imagePreview, setImagePreview] = useState(comicToEdit.image);

	const [formData, setFormData] = useState({
		title: comicToEdit.title,
		description: comicToEdit.description,
		price: comicToEdit.price,
		categories: comicToEdit.categories
			? comicToEdit.categories.map((category) => category.name)
			: [],
		author: comicToEdit.author,
		image: comicToEdit.image,
		stock: comicToEdit.stock,
		publisher: comicToEdit.publisher,
	});

	const handleChange = (e) => {
		const { name, options } = e.target;
		if (name === "categories") {
			const selectedValues = Array.from(options)
				.filter((option) => option.selected)
				.map((option) => option.value);
			setFormData((prevState) => ({
				...prevState,
				categories: selectedValues,
			}));
		} else {
			const { value } = e.target;
			setFormData((prevState) => ({
				...prevState,
				[name]: value,
			}));
		}

		setError({
			...error,
			[name]: "",
		});
	};

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		setFormData({
			...formData,
			image: file,
		});

		// Mostrar vista previa de la imagen
		const reader = new FileReader();
		reader.onload = (e) => {
			setImagePreview(e.target.result);
		};
		reader.readAsDataURL(file);
	};

	const handleImageRemove = () => {
		const fileInput = document.getElementById("image");
		fileInput.value = "";
		setFormData({
			...formData,
			image: "",
		});
		setImagePreview("");
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		// ############### VALIDACIONES ###############
		let hasError = false;
		const newErrors = { ...initialError };

		// Validación del título
		if (formData.title.length < 3) {
			newErrors.title = "Title must be at least 3 characters long";
			hasError = true;
		}

		// Validación de la descripción
		if (formData.description.length < 5) {
			newErrors.description = "Description must be at least 5 characters long";
			hasError = true;
		}

		// Validación del precio
		if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
			newErrors.price = "Price must be a valid positive number";
			hasError = true;
		}
		if (formData.price > 32766) {
			newErrors.price = "Price must be less than 32766";
			hasError = true;
		}

		// Validación de la categoría

		// Validación del autor
		if (formData.author.length < 3) {
			newErrors.author = "Author name must be at least 3 characters long";
			hasError = true;
		}

		// Validación del stock
		if (isNaN(formData.stock) || parseInt(formData.stock) < 0) {
			newErrors.stock = "Stock must be a valid non-negative number";
			hasError = true;
		}
		if (formData.stock > 32766) {
			newErrors.stock = "Stock must be less than 32766";
			hasError = true;
		}

		// Validación del editor (publisher)
		if (!publishers.includes(formData.publisher)) {
			newErrors.publisher = "Please select a publisher";
			hasError = true;
		}

		// Validación de la imagen
		if (!formData.image) {
			newErrors.image = "Please select an image";
			hasError = true;
		}

		if (hasError) {
			setError(newErrors);
			toast.error("You must complete the required fields!", {
				position: "bottom-center",
			});
		} else {
			try {
				const formDataToSend = new FormData();
				formDataToSend.append("title", formData.title);
				formDataToSend.append("description", formData.description);
				formDataToSend.append("price", formData.price);
				formData.categories.forEach((category, index) => {
					formDataToSend.append(`categories[${index}]`, category);
				});
				formDataToSend.append("author", formData.author);
				formDataToSend.append("image", formData.image);
				formDataToSend.append("stock", formData.stock);
				formDataToSend.append("publisher", formData.publisher);

				toast.loading("Save changes...", {
					position: "bottom-center",
					id: "loadingToast",
				});
				dispatch(updateComic({ id: id, data: formDataToSend }))
					.then((res) => {
						toast.dismiss("loadingToast");
						if (res.error) {
							throw res.error;
						}

						toast.success("Comic updating successfully!", {
							position: "bottom-right",
						});
						setFormData({
							title: res.payload.title,
							description: res.payload.description,
							price: res.payload.price,
							categories: res.payload.categories
								? res.payload.categories.map((category) => category.name)
								: [],
							author: res.payload.author,
							image: res.payload.image,
							stock: res.payload.stock,
							publisher: res.payload.publisher,
						});
						setImagePreview(res.payload.image);
					})
					.catch((error) => {
						toast.dismiss("loadingToast");
						console.error(error);
						toast.error("Error updating comic!", {
							position: "bottom-center",
						});
						return;
					});
			} catch (error) {
				console.error(error);
			}
		}
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<section className={styles.container}>
			<div className={styles.navbar}>
				<NavbarAdmin />
			</div>
			<div className={styles.containerForm}>
				<div className={styles.buttonBack}>
					<button onClick={handleGoBack}>
						<ArrowBackIcon fontSize="large" />
					</button>
				</div>
				<h2>Updating Comic</h2> <hr />
				<form
					onSubmit={handleSubmit}
					className={styles.formulario}>
					{/* <div className={styles.inputContainer}> */}
					<div className={styles.input__group}>
						<label
							htmlFor="title"
							className={styles.label}>
							Title <b>*</b>
						</label>
						<input
							type="text"
							name="title"
							id="title"
							value={formData.title}
							onChange={handleChange}
							placeholder="Title..."
							className={`${styles.input} ${
								error.title ? styles["input-error"] : ""
							}`}
						/>
						<span className={styles.tooltiptext}>
							&#128680; At least 3 characters long
						</span>
						{error.title && (
							<span
								onClick={() => setError({ ...error, title: "" })}
								className={styles.tooltip}>
								{error.title}
							</span>
						)}
					</div>

					<div className={styles.input__group}>
						<label
							htmlFor="description"
							className={styles.label}>
							Description <b>*</b>
						</label>
						<textarea
							name="description"
							id="description"
							value={formData.description}
							onChange={handleChange}
							placeholder="Description..."
							className={`${styles.textarea} ${
								error.description ? styles["input-error"] : ""
							}`}
						/>
						<span className={styles.tooltiptext}>
							&#128680; At least 5 characters long
						</span>
						{error.description && (
							<span
								onClick={() => setError({ ...error, description: "" })}
								className={styles.tooltip}>
								{error.description}
							</span>
						)}
					</div>
					<div className={styles.input__group}>
						<label
							htmlFor="price"
							className={styles.label}>
							Price <b>*</b>
						</label>
						<input
							type="number"
							id="price"
							name="price"
							value={formData.price}
							onChange={handleChange}
							placeholder="Price..."
							className={`${styles.input} ${
								error.price ? styles["input-error"] : ""
							}`}
						/>
						<span className={styles.tooltiptext}>
							&#128680; Price must be a valid positive number
						</span>
						{error.price && (
							<span
								onClick={() => setError({ ...error, price: "" })}
								className={styles.tooltip}>
								{error.price}
							</span>
						)}
					</div>
					<div className={styles.input__group}>
						<label
							htmlFor="stock"
							className={styles.label}>
							Stock <b>*</b>
						</label>
						<input
							type="number"
							name="stock"
							id="stock"
							value={formData.stock}
							onChange={handleChange}
							placeholder="Stock..."
							className={`${styles.input} ${
								error.stock ? styles["input-error"] : ""
							}`}
						/>
						<span className={styles.tooltiptext}>
							&#128680; Stock must be a valid non-negative number
						</span>
						{error.stock && (
							<span
								onClick={() => setError({ ...error, stock: "" })}
								className={styles.tooltip}>
								{error.stock}
							</span>
						)}
					</div>
					<div className={styles.input__group}>
						<label
							htmlFor="category"
							className={styles.label}>
							Category <b>*</b>
						</label>
						<select
							multiple
							name="categories"
							value={formData.categories}
							onChange={handleChange}
							className={`${styles.select} ${
								error.category ? styles["input-error"] : ""
							}`}>
							{categories.map((option) => (
								<option
									key={option.id}
									value={option.name}>
									{option.name}
								</option>
							))}
						</select>
						<span className={styles.tooltiptext}>
							&#128680; Please select a category
						</span>
						{error.category && (
							<span
								onClick={() => setError({ ...error, category: "" })}
								className={styles.tooltip}>
								{error.category}
							</span>
						)}
					</div>
					<div className={styles.input__group}>
						<label
							htmlFor="author"
							className={styles.label}>
							Author <b>*</b>
						</label>
						<input
							type="text"
							name="author"
							id="author"
							value={formData.author}
							onChange={handleChange}
							placeholder="Author..."
							className={`${styles.input} ${
								error.author ? styles["input-error"] : ""
							}`}
						/>
						<span className={styles.tooltiptext}>
							&#128680; At least 3 characters long
						</span>
						{error.author && (
							<span
								onClick={() => setError({ ...error, author: "" })}
								className={styles.tooltip}>
								{error.author}
							</span>
						)}
					</div>
					<div className={styles.input__group}>
						<label
							htmlFor="publisher"
							className={styles.label}>
							Publisher <b>*</b>
						</label>
						<select
							name="publisher"
							id="publisher"
							value={formData.publisher}
							onChange={handleChange}
							placeholder="Publisher..."
							className={`${styles.publisher_select} ${
								error.publisher ? styles["input-error"] : ""
							}`}>
							<option
								value=""
								disabled>
								Select a publisher
							</option>
							{publishers.map((publisher) => (
								<option
									key={publisher}
									value={publisher}>
									{publisher}
								</option>
							))}
						</select>
						<span className={styles.tooltiptext}>
							&#128680; Please select a publisher
						</span>
						{error.publisher && (
							<span
								onClick={() => setError({ ...error, publisher: "" })}
								className={styles.tooltip}>
								{error.publisher}
							</span>
						)}
					</div>
					{/* </div> */}
					<div className={styles.imageContainer}>
						<div className={styles.imagePreviewContainer}>
							{imagePreview && (
								<img
									id="image"
									src={imagePreview}
									alt="Preview"
									className={styles.imagePreview}
								/>
							)}
						</div>

						<div className={styles.selectFileContainer}>
							<label
								htmlFor="imageInput"
								className={styles.addImage}>
								<input
									type="file"
									id="imageInput"
									name="image"
									accept="image/*"
									onChange={handleImageChange}
									style={{ display: "none" }}
								/>
								<AddPhotoAlternateIcon
									fontSize="large"
									titleAccess="Add Image"
								/>
								<p>Add Image</p>
							</label>
							{imagePreview && (
								<button
									type="button"
									onClick={handleImageRemove}
									className={styles.removeImage}>
									Remove Image
								</button>
							)}
						</div>
						<div className={styles.buttonContainer}>
							<button type="submit">Save Changes</button>
						</div>
					</div>
				</form>
			</div>
		</section>
	);
};

export default EditComic;
