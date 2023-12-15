import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import HomePage from "./Pages/HomePage/HomePage";
import Profile from "./Pages/Profile/Profile";
import Detail from "./Pages/Detail/Detail";
import Recruitment from "./Pages/Recruitment/Recruitment";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/detail/:jobId" element={<Detail />} />
        <Route path="/recruitment" element={<Recruitment />} />
      </Routes>
    </>
  );
}

export default App;
