import React, { useState, useEffect, useRef } from "react";
import bot from "../../assets/lunabot1.png";
import user from "../../assets/user.png";
import send from "../../assets/send.png";
import "./ChatComponent.scss";

const ChatComponent = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const typingTextRef = useRef(null);
  const formRef = useRef(null);
  const textareaRef = useRef(null);

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
              <button id="btn">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 64 64"
                  id="copy-data"
                >
                  <path
                    fill="#F15439"
                    d="M45.321 16.538h13.217L45.321 3z"
                  ></path>
                  <path
                    fill="#399BB9"
                    d="M33.308 11.923H7.923V61h38.923V25.462H33.308V11.923z"
                  ></path>
                  <path
                    fill="#FFF"
                    d="M33.308 25.462h13.538L33.308 11.923z"
                  ></path>
                  <path d="M47.846 62H6.923V10.923h26.799l14.125 14.125V62zM8.923 60h36.923V25.876L32.894 12.923H8.923V60z"></path>
                  <path d="M46.846 26.462H32.308V11.923h2v12.539h12.538zM12.154 29.538h30.461v2H12.154zM12.154 54.923h30.461v2H12.154zM12.154 49.846h30.461v2H12.154zM12.154 44.77h30.461v2H12.154zM12.154 39.692h30.461v2H12.154zM12.154 34.615h30.461v2H12.154zM12.154 19.385h15.231v2H12.154zM29.077 19.385h1.692v2h-1.692zM12.154 24.462h15.231v2H12.154zM29.077 24.462h1.692v2h-1.692zM12.154 14.308h15.231v2H12.154zM29.077 14.308h1.692v2h-1.692z"></path>
                  <path d="M59.527 53.065h-9.588v-1.976h7.611V16.94L44.905 3.988H21.527v4.589H19.55V2.012h26.187l13.79 14.124z"></path>
                  <path d="M58.539 17.526H44.333V3h1.977v12.55h12.229z"></path>
                </svg>
                <span className="copy_float">Copied</span>
              </button>
            )}

            <div className="chat">
              <div className="profile">
                <img
                  src={msg.isAi ? bot : user}
                  alt={msg.isAi ? bot : "user"}
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
  );
};

export default ChatComponent;
