import React from "react";
import styles from "./MainPage.module.scss";
import robot from "../../assets/intror.jpg";

const MainPage = () => {
  return (
    <main className={styles.main}>
      <figure className={styles.left}>
        <img src={robot} alt="A.I robot image" className={styles.banner} />
      </figure>
      <div>
        <label>Future Innovations</label>
        <h2>L.U.N.A CODEX</h2>
        <p>
          An A.I chat application created with Vite, React.js and Sass.
          Utilizing the Open AI API to send prompts and receive responses
        </p>
        <input placeholder="e.g. Elon Musk" className={styles["name-input"]} />
        <button className={styles["get-started-btn"]}>Get Started</button>
      </div>
    </main>
  );
};

export default MainPage;
