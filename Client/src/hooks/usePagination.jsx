import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useWindowDimensions  from "./useWindowDimensions.jsx";

const usePagination = (data, itemPerPage = 5, initialPage = 1) => {
  const { width } = useWindowDimensions();
  switch (true) {
    case width < 783:
      itemPerPage = 1;
      break;
    case width < 1103:
      itemPerPage = 2;
      break;
    case width < 1423:
      itemPerPage = 3;
      break;
    case width < 1743:
      itemPerPage = 4;
      break;
    default:
      itemPerPage = 5;
      break;
  }


  const [currentPage, setCurrentPage] = useState(initialPage);
  const allComics = useSelector((state) => state.comic.allComics);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  // AGREGAR LOCATION COMO SEGUNDO PARAMETRO
  // let data;
  // if (location === "manga") {
  //   data = data.filter((comic) => comic.publisher === "Manga");
  // } else if (location === "comics") {
  //   data = data.filter((comic) => comic.publisher !== "Manga");
  // } else if (location === "all") {
  //   data = allComics;
  // }
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentPage(1);
  }, [allComics]);

  return {
    currentPage,
    totalPages: Math.ceil(data.length / itemPerPage),
    currentItems,
    paginate,
  };
};

export default usePagination;
