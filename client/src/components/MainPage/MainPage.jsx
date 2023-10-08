import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./MainPage.module.scss";
import Header from "../Header/Header";

const MainPage = () => {
  const [isHovered, setIsHovered] = useState(false);

  const inputRef = useRef(null);

  const navigate = useNavigate();

  const handleTextInput = (e) => {
    const value = e.target.value.trim();
    const words = value.split(/\s+/);
    if (words.length === 2) {
      e.target.value = words.slice(0, 2).join(" ");
    }
  };

  const handleMouseOver = () => {
    setTimeout(() => {
      setIsHovered(true);
    }, 400);
  };

  const handleGetStarted = () => {
    localStorage.setItem("lunaClient", inputRef?.current?.value);
    navigate("chat");
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
          ref={inputRef}
        />
        <div
          style={{ width: "fit-content" }}
          onMouseOver={handleMouseOver}
          onMouseOut={() => setIsHovered(false)}
        >
          {isHovered ? (
            <button
              className={styles["bordered-btn"]}
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          ) : (
            <button
              className={styles["get-started-btn"]}
              onClick={handleGetStarted}
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default MainPage;
