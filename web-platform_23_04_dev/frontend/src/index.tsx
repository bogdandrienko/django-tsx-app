// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import RegisterPage from "./pages/RegisterPage";
import TaskListPage from "./pages/TaskListPage";
import TaskPage from "./pages/TaskPage";
import TaskCreatePage from "./pages/TaskCreatePage";
import TaskChangePage from "./pages/TaskChangePage";
import HomePageNew from "./screens/HomePageNew";
import DumptrucksScan from "./screens/DumptrucksScan";
// @ts-ignore
import Drainage from "./screens/Drainage";
import ShovelsScan from "./screens/ShovelsScan";
import TripsPredictive from "./screens/TripsPredictive";
import ReportOperuchet from "./screens/ReportOperuchet";

import "./css/bootstrap/bootstrap.min.css";
import "./css/font_awesome/css/all.min.css";
import "./css/my.css";

import { store } from "./components/store";
import * as constants from "./components/constants";

// TODO settings ///////////////////////////////////////////////////////////////////////////////////////////////////////

axios.defaults.baseURL = constants.SERVER_HOST_AND_PORT_CONSTANT;

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePageNew />}></Route>
        <Route path="/dumptrucks" element={<DumptrucksScan />}></Route>
        <Route path="/shovels" element={<ShovelsScan />}></Route>
        <Route path="/predictive" element={<TripsPredictive />}></Route>
        <Route path="/drainage" element={<Drainage />}></Route>
        <Route path="/reports/operuchet" element={<ReportOperuchet />}></Route>
        {/*<Route path="/" element={<HomePage />}></Route>*/}
        {/*<Route path="/login" element={<LoginPage />}></Route>*/}
        {/*<Route path="/logout" element={<LogoutPage />}></Route>*/}
        {/*<Route path="/register" element={<RegisterPage />}></Route>*/}
        {/*<Route path="/tasks" element={<TaskListPage />}></Route>*/}
        {/*<Route path="/tasks/:id" element={<TaskPage />}></Route>*/}
        {/*<Route path="/tasks/create" element={<TaskCreatePage />}></Route>*/}
        {/*<Route path="/tasks/update/:id" element={<TaskChangePage />}></Route>*/}
      </Routes>
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
