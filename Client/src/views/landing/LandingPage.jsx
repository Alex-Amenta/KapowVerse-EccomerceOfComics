import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";

function LandingPage() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <h1><b>W</b>elcome to KapowVerse</h1>
        <p>
          Explore a universe of epic adventures, stunning artwork, and your
          favorite comic heroes. Discover and collect the latest issues, graphic
          novels, and exclusive merchandise.
        </p>
        <div className={styles.buttons}>
          <Link className={styles.link}>Sign In</Link>
          <Link to='/home' className={styles.link}>Explore Catalog</Link>
        </div>
      </div>
    </main>
  );
}

export default LandingPage;
