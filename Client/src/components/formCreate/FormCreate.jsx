import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./FormCreate.module.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { createComic } from "../../redux/features/comicSlice";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import imageAlert from "../../assets/murcielagos.png";
import base_url from "../../utils/development";

const initialFormData = {
	title: "",
	description: "",
	price: 0,
	category: "",
	author: "",
	image: "",
	stock: 0,
	publisher: "",
};

const initialError = {
	title: "",
	description: "",
	price: "",
	category: "",
	author: "",
	image: "",
	stock: "",
	publisher: "",
};

const categories = [
	"Superheroes",
	"Science Fiction",
	"Fantasy",
	"Adventure",
	"Action",
	"Horror",
	"Mystery",
	"Comedy",
	"Drama",
	"Romance",
	"Suspense",
];

const publishers = ["Marvel", "DC", "Manga"];

const FormCreate = () => {
	const dispatch = useDispatch();
	const [imagePreview, setImagePreview] = useState("");
	const [formData, setFormData] = useState(initialFormData);
	const [error, setError] = useState(initialError);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value,
		});

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

		// Validación de la categoría
		if (!categories.includes(formData.category)) {
			newErrors.category = "Please select a category";
			hasError = true;
		}

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

		// Validación del editor (publisher)
		if (!publishers.includes(formData.publisher)) {
			newErrors.publisher = "Please select a publisher";
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
				formDataToSend.append("category", formData.category);
				formDataToSend.append("author", formData.author);
				formDataToSend.append("image", formData.image);
				formDataToSend.append("stock", formData.stock);
				formDataToSend.append("publisher", formData.publisher);

				toast.loading("Creating comic...", {
					position: "bottom-center",
					id: "loadingToast",
				});
				dispatch(createComic(formDataToSend))
					.then((res) => {
						console.log(res);
						toast.dismiss("loadingToast");
						toast.success("Comic created successfully!", {
							position: "bottom-center",
						});
						setFormData(initialFormData);
						setImagePreview("");
					})
					.catch((error) => {
						toast.dismiss("loadingToast");
						console.error(error);
						toast.error("Error creating comic!", {
							position: "bottom-center",
						});
						return;
					});
			} catch (error) {
				console.error(error);
			}
		}
	};

	return (
		<section className={styles.container}>
			<h2>Create new Comic</h2> <hr />
			<form
				onSubmit={handleSubmit}
				className={styles.formulario}>
				<div className={styles.inputContainer}>
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
							htmlFor="category"
							className={styles.label}>
							Category <b>*</b>
						</label>
						<select
							name="category"
							id="category"
							value={formData.category}
							onChange={handleChange}
							placeholder="Category..."
							className={`${styles.select} ${
								error.category ? styles["input-error"] : ""
							}`}>
							<option
								value=""
								disabled>
								Select a category
							</option>
							{categories.map((category) => (
								<option
									key={category}
									value={category}>
									{category}
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
							className={`${styles.select} ${
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
				</div>
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
				</div>
				<div className={styles.buttonContainer}>
					<button type="submit">Create Cómic</button>
				</div>
				<Toaster
					toastOptions={{
						style: {
							border: "2px solid #000000",
							fontFamily: "Rubik, sans-serif",
							backgroundImage: `url(${imageAlert})`,
							backgroundSize: "cover",
							backgroundPosition: "right",
							backgroundRepeat: "no-repeat",
						},
					}}
				/>
			</form>
		</section>
	);
};

export default FormCreate;
