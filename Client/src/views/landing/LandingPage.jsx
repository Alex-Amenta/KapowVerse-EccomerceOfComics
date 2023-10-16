import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

function LandingPage() {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <div className={styles.titleContainer}>
          <h1>
            <b className={styles.welcome}>W</b>elcome to{" "}
            <b className={styles.name}>K</b>apow<b className={styles.name}>V</b>
            erse
          </h1>
          <p>
            Explore a universe of epic adventures, stunning artwork, and your
            favorite comic heroes. <br /> Discover and collect the latest issues,
            graphic novels, and exclusive merchandise.
          </p>
        </div>

        <div className={styles.buttons}>
          <Link className={styles.link}>Sign In</Link>
          <Link to="/app/home" className={styles.link}>
            Explore Catalog
          </Link>
        </div>
        <div className={styles.socialNetworks}>
          <a
            href="https://es-la.facebook.com/"
            target="_blank"
            title="Facebook"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
          </a>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            title="Instagram"
            rel="noopener noreferrer"
          >
            <InstagramIcon />
          </a>
          <a
            href="https://twitter.com/?lang=es"
            target="_blank"
            title="Twitter"
            rel="noopener noreferrer"
          >
            <TwitterIcon />
          </a>
        </div>
      </div>
    </main>
  );
}

export default LandingPage;
