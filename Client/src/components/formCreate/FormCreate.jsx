import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComic } from "../../redux/features/comicSlice";
import styles from "./FormCreate.css";

const FormCreate = () => {
  const dispatch = useDispatch();
  const comic = useSelector((state) => state.comic.comics);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    author: "",
    image: "",
    stock: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComic(formData));
    setFormData({
      title: "",
      description: "",
      price: "",
      category: "",
      author: "",
      image: "",
      stock: "",
      active: false,
    });
  };
  return (
    <div className="todo">
      <div className="formulario">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Create Comic</label>
          </div>
          <label>
            <div className="title">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Title"
            /></div>
          </label>
          <label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
            />
          </label>
          <label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
            />
          </label>
          <label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
            />
          </label>
          <label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author"
            />
          </label>
          <label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="Image"
            />
          </label>
          <label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              placeholder="Stock"
            />
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default FormCreate;