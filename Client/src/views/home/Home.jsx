import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logUserByLocalStorage, loginUser } from "../../redux/features/userSlice";
import CardsContainer from "../../components/cards-container/CardsContainer";
import Pagination from "../../components/pagination/Pagination";
import usePagination from "../../hooks/usePagination";
import Filters from "../../components/filters/Filters";
import { Toaster, toast } from "react-hot-toast";
import imageAlert from "../../assets/murcielagos.png";
import { useLocation } from "react-router-dom";
import styles from "./Home.module.css";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import { selectDarkMode } from "../../redux/features/darkModeSlice";

function Home() {
  const dispatch = useDispatch();
  const allComics = useSelector((state) => state.comic.allComics);
  const activeComics = allComics.filter((comic) => comic.active);
  const filterOptionsForPublisher = ["Marvel", "DC", "Manga"];

  // Mostrar notificación de compra exitosa
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get("status");

  useEffect(() => {
    if (localStorage.getItem("userlog")) {
      dispatch(
        // loginUser(JSON.parse(localStorage.getItem("userlog")))
        logUserByLocalStorage(JSON.parse(localStorage.getItem("userlog")))
      );
    }
  }, []);

  const { currentPage, totalPages, currentItems, paginate } =
    usePagination(activeComics);

  const handleFilterChange = () => {
    paginate(1);
  };

  useEffect(() => {
    if (status === "success" || status === "approved") {
      localStorage.removeItem("cart"),
        toast.success("Purchase completed successfully!", {
          position: "top-center",
          id: "success",
        });
    } else if (status === "failure" || status === "rejected") {
      toast.error("Purchase failed!", {
        position: "top-center",
        id: "error",
      });
    }
  }, [status]);

  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#e8e8e8" : "#15172D";
  }, [darkMode]);

  return (
    <>
      <Navbar />
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
