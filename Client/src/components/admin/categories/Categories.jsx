import NavbarAdmin from "../navbar/NavbarAdmin";
import styles from "./Categories.module.css";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import {
  createCategory,
  deleteCategory,
} from "../../../redux/features/categorySlice";
import Modal from "@mui/material/Modal";
import { useState } from "react";

const Categories = () => {
  const dispatch = useDispatch();
  const allCategories = useSelector((state) => state.category.allCategory);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (categoryId) => {
    toast(
      <div className={styles.containerToast}>
        <p>Are you sure you want to delete this category?</p>
        <div className={styles.toastButtons}>
          <button
            onClick={() => {
              dispatch(deleteCategory(categoryId));
              toast.dismiss();
              toast.success(`Category deleted successfully`, {
                position: "top-center",
                duration: 0,
              });
            }}
          >
            Accept
          </button>
          <button onClick={() => toast.dismiss()}>Cancel</button>
        </div>
      </div>,
      { duration: 20000 }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCategory = {
      name: newCategoryName,
    };

    dispatch(createCategory(newCategory));
    closeModal();
    toast.success("Category created successfully", { position: "top-center" });
  };

  return (
    <section className={styles.container}>
      <article className={styles.navbar}>
        <NavbarAdmin />
      </article>
      <article className={styles.content}>
        <div className={styles.titleContainer}>
          <h1>Categories</h1>
          <div className={styles.newCategory}>
            <p>Add new category</p>
            <button onClick={openModal}>
              <AddCircleIcon color="success" />
            </button>
          </div>
        </div>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table>
            <TableHead className={styles.tableHead}>
              <TableRow className={styles.tableRow}>
                <TableCell>Name</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell>{category.name}</TableCell>
                  <TableCell>
                    {category.status ? "active" : "inactive"}
                  </TableCell>
                  <TableCell>
                    <button onClick={() => handleDelete(category.id)}>
                      <HighlightOffIcon color="error" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </article>
      <Modal open={isModalOpen} onClose={closeModal} className={styles.modal}>
        <section className={styles.createCategory}>
          <h3>Add Category</h3>
          <div className={styles.formulario}>
            <label htmlFor="">Name:</label>
            <input
              type="text"
              name="name"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
            />
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </section>
      </Modal>
    </section>
  );
};

export default Categories;
