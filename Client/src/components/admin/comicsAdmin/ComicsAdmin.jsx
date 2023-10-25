import { useDispatch, useSelector } from "react-redux";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import usePagination from "../../../hooks/usePagination";
import Pagination from "../../pagination/Pagination";
import styles from "./ComicsAdmin.module.css";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import {
  filterAndSort,
  toggleComicStatus,
} from "../../../redux/features/comicSlice";
import { Link } from "react-router-dom";
import SearchbarAdmin from "../searchbar/SearchbarAdmin";
import NavbarAdmin from "../navbar/NavbarAdmin";
import { toast } from "react-hot-toast";
import BlockIcon from "@mui/icons-material/Block";
import RestoreIcon from "@mui/icons-material/Restore";

const ComicsAdmin = () => {
  const dispatch = useDispatch();
  const allComics = useSelector((state) => state.comic.allComics);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const { currentPage, totalPages, currentItems, paginate } = usePagination(
    allComics,
    15
  );

  const handleToggleStatus = (comicId, isActive) => {
    const message = isActive ? "marked as inactive" : "marked as active";

    toast(
      <div className={styles.containerToast}>
        <p>Are you sure you want to {message}?</p>
        <div className={styles.toastButtons}>
          <button
            onClick={() => {
              dispatch(toggleComicStatus(comicId));
              toast.dismiss();
              toast.success(`Comic ${message} successfully`, {
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

  const handleSortComics = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }

    dispatch(
      filterAndSort({
        category: "",
        publisher: "",
        sortBy:
          column === sortColumn
            ? sortOrder === "asc"
              ? "desc"
              : "asc"
            : "asc",
      })
    );
  };

  return (
    <section className={styles.container}>
      <div className={styles.navbar}>
        <NavbarAdmin />
      </div>
      <div className={styles.content}>
        <div className={styles.titleSearch}>
          <h1 className={styles.title}>List of Comics</h1>
          <SearchbarAdmin />
        </div>
        <TableContainer component={Paper} className={styles.tableContainer}>
          <Table>
            <TableHead>
              <TableRow className={styles.tableCell}>
                <TableCell>
                  <button
                    className={styles.sortButton}
                    onClick={() => handleSortComics("title")}
                  >
                    Title
                    {sortColumn === "title" && (
                      <span className={styles.sortArrow}>
                        {sortOrder === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </button>
                </TableCell>
                <TableCell>Author</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Stock</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentItems.map((comic) => (
                <TableRow key={comic.id}>
                  <TableCell>{comic.title}</TableCell>
                  <TableCell>{comic.author}</TableCell>
                  <TableCell>{`${comic.price} $`}</TableCell>
                  <TableCell>{comic.stock}</TableCell>
                  <TableCell>{comic.active ? "active" : "inactive"}</TableCell>
                  <TableCell>
                    <Link to={`/admin/edit/${comic.id}`}>
                      <button className={styles.edit}>
                        <EditIcon />
                      </button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleToggleStatus(comic.id, true)}
                      className={styles.delete}
                    >
                      {comic.active ? <BlockIcon /> : <RestoreIcon />}
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={paginate}
        />
      </div>
    </section>
  );
};

export default ComicsAdmin;
