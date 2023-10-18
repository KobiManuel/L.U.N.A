import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import styles from "./MainPage.module.scss";
import Header from "../Header/Header";
import KeepWebsiteAlive from "../KeepWebsiteAlive";

const MainPage = () => {
  const [error, setError] = useState(false);

  const inputRef = useRef(null);

  const navigate = useNavigate();

  KeepWebsiteAlive();

  useEffect(() => {
    const userName = localStorage.getItem("lunaClient");
    if (userName) {
      const [firstName, lastName] = userName.split(" ");
      if (inputRef.current) {
        inputRef.current.value = `${firstName} ${lastName}`;
      }
    }
  }, []);

  const handleTextInput = (e) => {
    const value = e.target.value.trim();
    const words = value.split(/\s+/);
    if (error) {
      setError(false);
    }
    if (words.length === 2) {
      e.target.value = words.slice(0, 2).join(" ");
    }
  };

  const handleGetStarted = () => {
    const value = inputRef.current.value.trim();
    const words = value.split(/\s+/);
    const [first, last] = words;

    if (!first || !last) {
      setError(true);
    }

    if (first && last) {
      localStorage.setItem("lunaClient", value);
      navigate("/chat");
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
          An A.I chat application created with Vite, React.js and Node.js.
          Utilizing the Open AI API to send prompts and receive responses
        </p>
        <div style={{ position: "relative", width: "fit-content" }}>
          <input
            placeholder="e.g. Elon Musk"
            className={styles["name-input"]}
            onChange={handleTextInput}
            ref={inputRef}
          />
          {error ? (
            <span className={styles["error-msg"]}>
              Input should contain two names
            </span>
          ) : (
            ""
          )}
        </div>

        <button
          className={styles["get-started-btn"]}
          onClick={handleGetStarted}
        >
          Get Started
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </main>
  );
};

export default MainPage;
