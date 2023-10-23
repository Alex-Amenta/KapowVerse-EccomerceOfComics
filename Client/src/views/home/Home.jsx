import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logUserByLocalStorage } from "../../redux/features/userSlice";
import CardsContainer from "../../components/cards-container/CardsContainer";
import Pagination from "../../components/pagination/Pagination";
import usePagination from "../../hooks/usePagination";
import Filters from "../../components/filters/Filters";
import { Toaster, toast } from "react-hot-toast";
import imageAlert from "../../assets/murcielagos.png";
import { useLocation } from "react-router-dom";
import styles from "./Home.module.css";
import axios from "axios";

function Home() {
  const dispatch = useDispatch();
  const allComics = useSelector((state) => state.comic.allComics);
  const filterOptionsForPublisher = ["Marvel", "DC", "Manga"];

  // Mostrar notificación de compra exitosa
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get("status");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(
        logUserByLocalStorage(JSON.parse(localStorage.getItem("token")))
      );
    }
  }, []);

  const { currentPage, totalPages, currentItems, paginate } =
    usePagination(allComics);

  const handleFilterChange = () => {
    paginate(1);
  };


  return (
    <>
      {/* {
        status === "approved" && (
          <div className={styles.msgContainer}>
            <p>
              <span>🎉</span>Thank you for shopping at KapowVerse! Your purchase was
              successful, and you will receive a confirmation email shortly.
            </p>
            <button>Accept</button>
          </div>
        )
      } */}
      {/* {status === "rejected" &&
        toast.error(
          "We're sorry, but your purchase was rejected. Please check your email for more information.",
          { position: "top-center" }
        )} */}

      <Filters
        onFilterChange={handleFilterChange}
        filterOptions={filterOptionsForPublisher}
      />
      <CardsContainer allComics={currentItems} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={paginate}
      />
    </>
  );
}

export default Home;
