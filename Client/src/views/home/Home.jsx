/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  logUserByLocalStorage,
} from "../../redux/features/userSlice";
import CardsContainer from "../../components/cards-container/CardsContainer";
import usePagination from "../../hooks/usePagination";
import Filters from "../../components/filters/Filters";
import { toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import { selectDarkMode } from "../../redux/features/darkModeSlice";
import { clearCart } from "../../redux/features/cartSlice";

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
        logUserByLocalStorage(JSON.parse(localStorage.getItem("userlog")))
      );
    }
  }, []);





  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) toast.dismiss("toastId2");
    if (status === "success" || status === "approved") {
      localStorage.removeItem("cart");
      dispatch(clearCart());
      if (mounted) {
        toast.success("Purchase completed successfully!", {
          position: "top-center",
          id: "success",
          duration: 5000,
        });
      }
    } else if (status === "failure" || status === "rejected") {
      if (mounted) {
        toast.error("Purchase failed!", {
          position: "top-center",
          id: "error",
          duration: 5000,
        });
      }
    }
  }, [status, mounted]);

  useEffect(() => {
    setMounted(true);
  }, []);
  const { currentPage, totalPages, currentItems, paginate } =
  usePagination(activeComics);

  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    document.body.style.backgroundColor = darkMode ? "#e8e8e8" : "#15172D";
  }, [darkMode]);

  return (
    <>
      <Navbar />
      <Filters
      currentPage={currentPage}
      totalPages={totalPages}
      paginate={paginate}
        activeComics={activeComics}
        filterOptions={filterOptionsForPublisher}
      />
      <CardsContainer allComics={currentItems} />

    </>
  );
}

export default Home;
