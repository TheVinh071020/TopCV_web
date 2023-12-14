import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import HomePage from "./Pages/HomePage/HomePage";
import Profile from "./Pages/Profile/Profile";
import Detail from "./Pages/Detail/Detail";

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
      </Routes>
    </>
  );
}

export default App;
