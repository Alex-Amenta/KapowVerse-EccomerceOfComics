import NavbarAdmin from '../navbar/NavbarAdmin';
import styles from './Sales.module.css';

const Sales = () => {
  return (
    <section className={styles.container}>
      <article className={styles.navbar}>
        <NavbarAdmin />
      </article>
      <article className={styles.content}>
       <h1>Sales</h1>
      </article>
    </section>
  );
};

export default Sales;
