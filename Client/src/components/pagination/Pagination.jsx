import styles from "./Pagination.module.css";
import { Link } from "react-router-dom";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {

  return (
    <div className={styles.container}>
      {currentPage !== 1 ? (
        <Link
          to="#"
          className={styles.Link}
          onClick={() => onPageChange(currentPage - 1)}
          title="Página anterior"
          
        >
          <ArrowLeftIcon />
        </Link>
      ) : (
        <ArrowLeftIcon className={styles.disabled} />
      )}
      <span className={styles.pageIndicator}>
        {currentPage} of {totalPages}
      </span>
      {currentPage !== totalPages && totalPages > 0 ? (
        <Link
          to="#"
          className={styles.Link}
          onClick={() => onPageChange(currentPage + 1)}
          title="Página siguiente"
        >
          <ArrowRightIcon />
        </Link>
      ) : (
        <ArrowRightIcon className={styles.disabled} />
      )}
    </div>
  );
};

export default Pagination;
