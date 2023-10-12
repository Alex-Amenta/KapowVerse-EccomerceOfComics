import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/navbar/Navbar";
import { useEffect } from "react";
import { fetchComics } from "../../redux/features/comicSlice";
import CardsContainer from "../../components/cards-container/CardsContainer";
import Pagination from "../../components/pagination/Pagination";
import usePagination from "../../hooks/usePagination";

function Home() {
  const dispatch = useDispatch();
  const allComics = useSelector((state) => state.comic.allComics);

  useEffect(() => {
    dispatch(fetchComics());
  }, []);

  const { currentPage, totalPages, currentItems, paginate } =
    usePagination(allComics);

  return (
    <>
      <Navbar />
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
