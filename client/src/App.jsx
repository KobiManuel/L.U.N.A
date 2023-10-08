import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./components/MainPage/MainPage";
import ChatComponent from "./components/Chat/ChatComponent";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="chat" element={<ChatComponent />} />
      </Routes>
    </>
  );
}

export default App;
