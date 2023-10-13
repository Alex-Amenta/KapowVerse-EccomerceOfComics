import { useSelector } from "react-redux";
import CardsContainer from "../../components/cards-container/CardsContainer";
import Pagination from "../../components/pagination/Pagination";
import usePagination from "../../hooks/usePagination";
import Filters from "../../components/filters/Filters";

function ComicsSection() {
  const allComics = useSelector((state) => state.comic.allComics);
  const comicsFiltered = allComics.filter(
    (comic) => comic.publisher !== "Manga"
  );

  const { totalPages, currentItems, paginate, currentPage } =
    usePagination(comicsFiltered);

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

export default ComicsSection;
