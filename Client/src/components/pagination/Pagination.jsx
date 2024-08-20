import styles from "./Pagination.module.css";
import { Link } from "react-router-dom";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { selectDarkMode } from "../../redux/features/darkModeSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useState } from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const darkMode = useSelector(selectDarkMode);
  
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    console.log("ontouchstart ",e.targetTouches[0].clientX)

    setTouchEnd(null); // Restablecer el touchEnd a null
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    console.log("ontouchmove ",e.targetTouches[0].clientX)
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    console.log("ontouchend ",touchStart,touchEnd)
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    } else if (isRightSwipe && currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  return (
    <div className={darkMode ? styles.container : styles.dark}
    onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}>
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
        {totalPages === 0 ? 0 : currentPage} of {totalPages}
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
