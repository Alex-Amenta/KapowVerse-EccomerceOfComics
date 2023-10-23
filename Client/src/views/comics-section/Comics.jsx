import { useSelector } from "react-redux";
import CardsContainer from "../../components/cards-container/CardsContainer";
import Pagination from "../../components/pagination/Pagination";
import usePagination from "../../hooks/usePagination";
import Filters from "../../components/filters/Filters";
import Navbar from "../../components/navbar/Navbar";

function ComicsSection() {
  const allComics = useSelector((state) => state.comic.allComics);

  const comicsFiltered = allComics.filter(
    (comic) => comic.publisher !== "Manga"
  );

  const hasComicsWithNoCategory = comicsFiltered.length === 0;

  const { totalPages, currentItems, paginate, currentPage } =
    usePagination(comicsFiltered);

  const handleFilterChange = () => {
    paginate(1);
  };

  const filterOptionsForPublisher = ["Marvel", "DC"];

  return (
    <>
    <Navbar/>
      <Filters
        onFilterChange={handleFilterChange}
        filterOptions={filterOptionsForPublisher}
        noCategoryComics={hasComicsWithNoCategory}
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

export default ComicsSection;
