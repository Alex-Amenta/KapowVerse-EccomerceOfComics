import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { logUserByLocalStorage } from "../../redux/features/userSlice";
import CardsContainer from "../../components/cards-container/CardsContainer";
import Pagination from "../../components/pagination/Pagination";
import usePagination from "../../hooks/usePagination";
import Filters from "../../components/filters/Filters";
import PopUpSuccess from "../../components/popups/cart/PopUpSucces";
import PopUpFail from "../../components/popups/cart/PopUpFail";
import PopUpUser from "../../components/popups/user/PopUpUser";
import { useSearchParams } from "react-router-dom";

function Home() {
  const dispatch = useDispatch();
  const allComics = useSelector((state) => state.comic.allComics);
  const filterOptionsForPublisher = ["Marvel", "DC", "Manga"];

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

  const [searchParams] = useSearchParams();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const popUp = searchParams.get("status");
  const popUpFail = searchParams.get("status");
  const popUpUserBlock = searchParams.get("error");

  if (popUpUserBlock === "unauthorized") {
    return (
      <>
        <PopUpUser
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        />
      </>
    );
  }

  if (popUpFail === "rejected") {
    return (
      <>
        <PopUpFail
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        />
      </>
    );
  }

  if (popUp === "approved") {
    return (
      <>
        <PopUpSuccess
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        />
      </>
    );
  } else {
    return (
      <>
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
}

export default Home;
