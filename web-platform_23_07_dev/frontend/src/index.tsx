// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

// base
import HomePage from "./screens/BaseHomePage" ;

// pto
import PtoTimeToLoad from "./screens/PtoTimeToLoad";
import PtoOperativeStoppages from "./screens/PtoOperativeStoppages";
import PtoErrorsAsd from "./screens/PtoErrorsAsd";
import PtoNormTrips from "./screens/PtoNormTrips";
import PtoAnalyticTech from "./screens/PtoAnalyticTech";
import PtoOperuchet from "./screens/PtoOperuchet";

// atc
import AtcAvgSpeed from "./screens/AtcAvgSpeed";

// events
import EventsDumptrucks from "./screens/EventsDumptrucks";
import EventsDrainage from "./screens/EventsDrainage";
import EventsShovels from "./screens/EventsShovels";

// events
import LoginPage from "./screens/LoginPage";

// css
import "./css/bootstrap/bootstrap.css";
import "./css/font_awesome/css/all.min.css";
import "./css/my.css";

import { store } from "./components/store";
// import * as constants from "./components/constants";

// TODO settings ///////////////////////////////////////////////////////////////////////////////////////////////////////

// axios.defaults.baseURL = constants.SERVER_HOST_AND_PORT_CONSTANT;
// axios.defaults.baseURL = "/api";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {/* base */}
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/home" element={<HomePage />}></Route>

        {/* pto */}
        <Route path="/pto/time_to_load" element={<PtoTimeToLoad />}></Route>
        <Route
          path="/pto/operative_stoppages"
          element={<PtoOperativeStoppages />}
        ></Route>
        <Route path="/pto/errors_asd" element={<PtoErrorsAsd />}></Route>
        <Route path="/pto/normtrips" element={<PtoNormTrips />}></Route>
        <Route path="/pto/analytictech" element={<PtoAnalyticTech />}></Route>
        <Route path="/pto/operuchet" element={<PtoOperuchet />}></Route>

        {/* atc */}
        <Route path="/atc/avg_speed" element={<AtcAvgSpeed />}></Route>

        {/* events */}
        <Route path="/events/drainage" element={<EventsDrainage />}></Route>
        <Route path="/events/dumptrucks" element={<EventsDumptrucks />}></Route>
        <Route path="/events/shovels" element={<EventsShovels />}></Route>
        {/*<Route path="/events/auxes" element={<EventsAuxes />}></Route>*/}

        <Route path="/login" element={<LoginPage />}></Route>

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
