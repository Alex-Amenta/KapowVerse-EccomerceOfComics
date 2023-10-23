import { useSelector } from "react-redux";
import Pagination from "../../pagination/Pagination";
import usePagination from "../../../hooks/usePagination";
import NavbarAdmin from "../navbar/NavbarAdmin";
import styles from "./AdminHome.module.css";
import Cards from "../cards/Cards";

const AdminHome = () => {

  return (
    <section className={styles.container}>
      <div className={styles.navbar}>
        <NavbarAdmin />
      </div>
      <div className={styles.content}>
        <Cards  />
      </div>
    </section>
  );
};

export default AdminHome;
