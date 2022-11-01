import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home, { Page1 } from "./pages/Home";
import Login from "./pages/Login";
import Router from "./app/router";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000";

export function App1() {
  return (
    <div className="App">
      <header className="App-header">
        <a href="/">go</a>
      </header>
    </div>
  );
}

export function App() {
  return (
    <Router />
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Home />}></Route>
    //     <Route path="/login" element={<Login />}></Route>
    //   </Routes>
    // </BrowserRouter>
  );
}

export default App;
