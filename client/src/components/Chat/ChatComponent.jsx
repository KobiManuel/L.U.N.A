import React, { useState, useEffect, useRef } from "react";
import bot from "../../assets/lunabot1.png";
import user from "../../assets/user.png";
import send from "../../assets/send.png";
import "./ChatComponent.scss";
import CopyIcon from "../Icons/CopyIcon";
import CheckCircle from "../Icons/CheckCircle";
import Header from "../Header/Header";

const ChatComponent = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [copied, setCopied] = useState(false);
  const typingTextRef = useRef(null);
  const formRef = useRef(null);
  const textareaRef = useRef(null);

  const capitalizeFirstTwoLetters = (str) => {
    return str
      .split(" ")
      .map((word) => {
        const firstTwoLetters = word.slice(0, 2).toUpperCase();
        return firstTwoLetters;
      })
      .join(" ");
  };

  const userName = localStorage.getItem("lunaClient");

  const generateUniqueId = () => {
    const timeStamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `id-${timeStamp}-${hexadecimalString}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    typingTextRef.current.classList.add("hidden");

    if (inputValue.trim() === "") {
      alert("Empty prompt");
      return;
    }

    setInputValue("");

    setChatMessages((prevMessages) => [
      ...prevMessages,
      { isAi: false, message: inputValue },
    ]);

    const uniqueId = generateUniqueId();
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { isAi: true, message: "", uniqueId },
    ]);

    // Simulating server response delay
    setTimeout(async () => {
      // Assume this is your actual fetch call
      // const response = await fetch('http://localhost:5000', {
      //   method: 'POST',
      //   headers: {
      //     'Content-type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     prompt: inputValue,
      //   }),
      // });

      // Simulate server response
      const response = {
        ok: true,
        json: async () => ({ bot: "Hello! I am a simulated response." }),
      };

      if (response.ok) {
        const data = await response.json();
        const parsedData = data.bot.trim();

        // Update the chat messages with the AI's response
        setChatMessages((prevMessages) =>
          prevMessages.map((msg) =>
            msg.uniqueId === uniqueId ? { ...msg, message: parsedData } : msg
          )
        );
      } else {
        alert("Houston, we have a problem! 🤯🤯");
      }
    }, 2000); // Simulating a 2-second server response delay
  };

  const text =
    "Hello, I am L.U.N.A codex. Your Language Understanding Neural Assistant. I am here to assist you on your tasks.";
  const speed = 50;
  let i = 0;

  function typeText() {
    if (i < text.length) {
      typingTextRef.current.innerHTML += text.charAt(i);
      i++;
      setTimeout(typeText, speed);
    }
  }

  function handleClick(event) {
    const button = event.currentTarget;
    const div = button.parentNode;

    const text = div.querySelector(".message").textContent;
    navigator.clipboard.writeText(text);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  }

  const autoResize = () => {
    const formElement = formRef.current;
    const textareaElement = textareaRef.current;
    const height =
      textareaElement.scrollHeight - textareaElement.scrollHeight * 0.5;
    if (textareaElement.scrollHeight > 62) {
      formElement.style.height = `${textareaElement.scrollHeight - height}px`;
    }
  };

  return (
    <>
      <Header />
      <div id="app" onLoad={typeText}>
        <div id="typing-text" className="wrapper ai" ref={typingTextRef}>
          <span class="profile ai">
            <img src={bot} alt="/" />
          </span>
        </div>
        <div id="chat_container">
          {chatMessages.map((msg, index) => (
            <div key={index} className={`wrapper ${msg.isAi ? "ai" : ""}`}>
              {msg.isAi && (
                <button id="btn" onClick={handleClick}>
                  {copied ? (
                    <CheckCircle className={"svg"} size={18} />
                  ) : (
                    <CopyIcon size={18} />
                  )}

                  {copied ? <span className="copy_float">Copied</span> : ""}
                </button>
              )}

              <div className="chat">
                <div className="profile">
                  <img
                    src={msg.isAi ? bot : user}
                    alt={msg.isAi ? "bot" : "user"}
                  />
                </div>
                <div className="message" id={msg.uniqueId}>
                  {msg.message}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="form-container">
          <form
            style={{ minHeight: "62px" }}
            onSubmit={handleSubmit}
            onInput={autoResize}
            ref={formRef}
          >
            <textarea
              name="prompt"
              rows="1"
              cols="1"
              placeholder="Ask L.U.N.A..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              ref={textareaRef}
            />
            <button type="submit">
              <img src={send} alt="Send" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;
