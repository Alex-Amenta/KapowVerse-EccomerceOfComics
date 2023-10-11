import usePagination from "../../hooks/usePagination";

const Pagination = () => {
  const { currentPage, totalPages, currentItems, paginate } =
    usePagination(data);
  return (<></>);
};

export default Pagination;
