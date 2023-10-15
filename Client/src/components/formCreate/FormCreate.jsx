import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./FormCreate.module.css";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { createComic } from "../../redux/features/comicSlice";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const FormCreate = () => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState("");

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

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    author: "",
    image: "",
    stock: "",
    publisher: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
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

      await axios.post("http://localhost:3001/comic", formDataToSend);
      toast.success("Comic created successfully!", {
        position: "bottom-center",
      });
      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        author: "",
        image: "",
        stock: "",
        publisher: "",
      });
      setImagePreview("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className={styles.container}>
      <h2>Create new Comic</h2> <hr />
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title..."
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description..."
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price..."
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category..."
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Author..."
          />
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Stock..."
          />
          <select
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            placeholder="Publisher..."
          >
            <option value="" disabled>
              Select a publisher
            </option>
            {publishers.map((publisher) => (
              <option key={publisher} value={publisher}>
                {publisher}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.imagePreviewContainer}>
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className={styles.imagePreview}
              />
            )}
          </div>

          <div className={styles.selectFileContainer}>
            <label htmlFor="imageInput">
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
                className={styles.addImage}
                titleAccess="Add Image"
              />
              <p>Add Image</p>
            </label>
            {imagePreview && (
              <button
                type="button"
                onClick={handleImageRemove}
                className={styles.removeImage}
              >
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
            },
          }}
        />
      </form>
    </section>
  );
};

export default FormCreate;
