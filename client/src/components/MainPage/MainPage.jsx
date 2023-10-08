import React from "react";
import styles from "./MainPage.module.scss";
import Header from "../Header/Header";

const MainPage = () => {
  const handleTextInput = (e) => {
    const value = e.target.value.trim();
    const words = value.split(/\s+/);
    if (words.length === 2) {
      e.target.value = words.slice(0, 2).join(" ");
    }
  };

  return (
    <main className={styles.main}>
      <Header />
      <figure className={styles.left}>
        {/* <img src={robot} alt="A.I robot image" className={styles.banner} /> */}
      </figure>
      <div className={styles.right}>
        <label className={styles.label}>
          {" "}
          Language Understanding Neural Assistant
        </label>
        <h2 className={styles.header}>L.U.N.A CODEX</h2>

        <p className={styles.desc}>
          An A.I chat application created with Vite, React.js and Sass.
          Utilizing the Open AI API to send prompts and receive responses
        </p>
        <input
          placeholder="e.g. Elon Musk"
          className={styles["name-input"]}
          onChange={handleTextInput}
        />
        <button className={styles["get-started-btn"]}>Get Started</button>
      </div>
    </main>
  );
};

export default MainPage;
