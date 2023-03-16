import axios from "axios";
import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import "./css/bootstrap/bootstrap.min.css";
// import "./js/bootstrap/bootstrap.min.js";
import "./css/font_awesome/css/all.css";
import "./css/my.css";
// import Home from "./screens/0_Home";
import Home from "./screens/1_main/HomeNew";
// import Login from "./screens/1_Login";
import Login from "./screens/1_main/Login";
import AsdReport from "./screens/1_main/AsdReport";
import Instructions from "./screens/2_Instructions";
import Vision from "./screens/3_Vision";
import Predictivity from "./screens/4_Predictivity";
import Virtual from "./screens/5_Virtual";
import Asd from "./screens/6_Asd";
import External from "./screens/7_External";
import Sup from "./screens/8_Sup";
import { HomePage } from "./pages/1_main/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

axios.defaults.baseURL = "http://127.0.0.1:8083/";

// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        {/*<Route path="/login" element={<Login />}></Route>*/}
        {/*<Route path="/instructions" element={<Instructions />}></Route>*/}
        {/*<Route path="/vision" element={<Vision />}></Route>*/}
        {/*<Route path="/predictivity" element={<Predictivity />}></Route>*/}
        {/*<Route path="/virtual" element={<Virtual />}></Route>*/}
        {/*<Route path="/asd" element={<Asd />}></Route>*/}
        {/*<Route path="/external" element={<External />}></Route>*/}
        {/*<Route path="/sup" element={<Sup />}></Route>*/}
        {/*<Route path="/asd_report" element={<AsdReport />}></Route>*/}
      </Routes>
    </BrowserRouter>
  );
}
