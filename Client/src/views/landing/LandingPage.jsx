import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

function LandingPage() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1>
          <b className={styles.welcome}>W</b>elcome to{" "}
          <b className={styles.name}>K</b>apow<b className={styles.name}>V</b>
          erse
        </h1>
        <p>
          Explore a universe of epic adventures, stunning artwork, and your
          favorite comic heroes. Discover and collect the latest issues, graphic
          novels, and exclusive merchandise.
        </p>
        <div className={styles.buttons}>
          <Link to="/home" className={styles.link}>
            Explore Catalog
          </Link>
        </div>
      </div>
    </main>
  );
}

export default LandingPage;
