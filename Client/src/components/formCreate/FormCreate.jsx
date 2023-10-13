import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./FormCreate.module.css";
import { createComic } from "../../redux/features/comicSlice";

const FormCreate = () => {
  const dispatch = useDispatch();

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

  const publishers = ['Marvel', 'DC', 'Manga'];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createComic(formData));
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
  };

  return (
    <div className={styles.container}>
      <h2>Create new Comic</h2>
      <form onSubmit={handleSubmit} className={styles.formulario}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Título"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Descripción"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Precio"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          placeholder="Categoría"
        >
          <option value="" disabled>
            Seleccione una categoría
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
          placeholder="Autor"
        />
        <input
          type="text"
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="URL de la Imagen"
        />
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          placeholder="Stock"
        />
        <select
          name="publisher"
          value={formData.publisher}
          onChange={handleChange}
          placeholder="Editor"
        >
          <option value="" disabled>
            Seleccione un editor
          </option>
          {publishers.map((publisher) => (
            <option key={publisher} value={publisher}>
              {publisher}
            </option>
          ))}
        </select>
        <button type="submit">Create Cómic</button>
      </form>
    </div>
  );
};

export default FormCreate;
