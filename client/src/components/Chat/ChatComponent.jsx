import React, { useState } from "react";
import bot from "./assets/intror.jpg";
import user from "./assets/react.svg";
import "./ChatComponent.scss";

const ChatComponent = () => {
  const [chatMessages, setChatMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const generateUniqueId = () => {
    const timeStamp = Date.now();
    const randomNumber = Math.random();
    const hexadecimalString = randomNumber.toString(16);
    return `id-${timeStamp}-${hexadecimalString}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputValue.trim() === "") {
      alert("Empty prompt");
      return;
    }

    setInputValue("");

    // Update chat messages with the user's input
    setChatMessages((prevMessages) => [
      ...prevMessages,
      { isAi: false, message: inputValue },
    ]);

    // Fetch response from server (simulated here with a setTimeout)
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

  return (
    <div id="app">
      {/* Other HTML components go here */}

      <div id="chat_container">
        {chatMessages.map((msg, index) => (
          <div key={index} className={`wrapper ${msg.isAi ? "ai" : ""}`}>
            {msg.isAi && (
              <button id="btn" onClick={handleClick}>
                {/* Add the SVG for copy button here */}
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
        <form style={{ minHeight: "62px" }} onSubmit={handleSubmit}>
          <textarea
            name="prompt"
            rows="1"
            cols="1"
            placeholder="Ask L.U.N.A..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">
            <img src="assets/send.png" alt="Send" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatComponent;
