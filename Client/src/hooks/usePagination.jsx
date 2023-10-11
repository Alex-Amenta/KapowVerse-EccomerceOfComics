import { useState } from "react";

const usePagination = (data, itemPerPage = 6, initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  return {
    currentPage,
    totalPages: Math.ceil(data.length / itemPerPage),
    currentItems,
    paginate,
  };
};

export default usePagination;
