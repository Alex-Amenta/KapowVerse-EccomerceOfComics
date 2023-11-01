import React from 'react';
import { Link } from "react-router-dom";
import styles from "./PageError.module.css";

const ErrorPage = () => {
  return (
    <main className={styles.container}>
        <div className={styles.content}>
        <div className={styles.titleContainer}>
          <h1>
            <b className={styles.name}>I can't believe it!&nbsp; 404</b>
          </h1>
          <h2>
            <b className={styles.name}>Page not found</b>
          </h2>
          <p>Sorry, the page you are looking for does not exist
          </p>
        </div>

        <div className={styles.buttons}>
            <Link to="/" className={styles.link}>
            Return to KapowVerse
            </Link>
        </div>
        </div>
    </main>
  );
}

export default ErrorPage;
