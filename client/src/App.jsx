import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./component/Register/Register";
import Login from "./component/Login/Login";
import HomePage from "./component/HomePage/HomePage";
import Profile from "./component/Profile/Profile";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
