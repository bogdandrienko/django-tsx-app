import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home, { Page1 } from "../pages/Home";
import Login from "../pages/Login";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
