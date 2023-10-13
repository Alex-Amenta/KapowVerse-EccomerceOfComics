import { useSelector } from "react-redux";
import CardsContainer from "../../components/cards-container/CardsContainer";
import usePagination from "../../hooks/usePagination";
import Pagination from "../../components/pagination/Pagination";
import Filters from "../../components/filters/Filters";

function MangasSection() {
  const allComics = useSelector((state) => state.comic.allComics);
  const mangasFiltered = allComics.filter(
    (comic) => comic.publisher === "Manga"
  );

  const { totalPages, currentItems, paginate, currentPage } =
    usePagination(mangasFiltered);

  const handleFilterChange = () => {
    paginate(1);
  };

  return (
    <>
      <Filters onFilterChange={handleFilterChange} />
      <CardsContainer allComics={currentItems} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={paginate}
      />
    </>
  );
}

export default MangasSection;
