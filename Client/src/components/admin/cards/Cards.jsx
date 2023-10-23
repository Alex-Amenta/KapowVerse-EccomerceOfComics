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
import styles from "./Cards.module.css";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import { filterAndSort } from "../../../redux/features/comicSlice";

const Cards = () => {
  const dispatch = useDispatch();
  const allComics = useSelector((state) => state.comic.allComics);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const { currentPage, totalPages, currentItems, paginate } = usePagination(
    allComics,
    15
  );

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
    <>
      <h1 className={styles.title}>List of Comics</h1>
      <TableContainer component={Paper} className={styles.tableContainer}>
        <Table>
          <TableHead>
            <TableRow style={{fontWeight: 'bold', backgroundColor: '#b2aaaa'}}>
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
                  <button className={styles.edit}>
                    <EditIcon />
                  </button>
                </TableCell>
                <TableCell>
                  <button className={styles.delete}>
                    <DeleteIcon />
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
    </>
  );
};

export default Cards;
