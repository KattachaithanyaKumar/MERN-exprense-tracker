import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
};

export default App;
