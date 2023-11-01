import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../pagination/Pagination";
import usePagination from "../../../hooks/usePagination";
import NavbarAdmin from "../navbar/NavbarAdmin";
import styles from "./AdminHome.module.css";
import Cards from "../comicsAdmin/ComicsAdmin";
import { useEffect } from "react";
import { fetchComics } from "../../../redux/features/comicSlice";
import { fetchCategories } from "../../../redux/features/categorySlice";
import {
  MostSoldComicsBarChart,
  UserRegistrationBarChart,
} from "../graphics/BarChart";
import { PieChart } from "../graphics/PieChart";
import { PurchasesLineChart } from "../graphics/LineChart";

const AdminHome = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchComics());
    dispatch(fetchCategories());
  }, []);

  return (
    <section className={styles.container}>
      <article className={styles.navbar}>
        <NavbarAdmin />
      </article>
      <article className={styles.content}>
        <h2>Comics statistics</h2>
        <div className={styles.comics}>
          <MostSoldComicsBarChart />
          <PieChart />
        </div>

        <h2>User statistics</h2>
        <div className={styles.user}>
          <UserRegistrationBarChart />
        </div>

        <h2>Purchases statistics</h2>
        <div className={styles.purchases}>
          <PurchasesLineChart />
        </div>
      </article>
    </section>
  );
};

export default AdminHome;
