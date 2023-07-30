// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

// base
import HomePage from "./pages/BaseHome";

// pto
import PtoTimeToLoad from "./pages_old/PtoTimeToLoad";
import PtoOperativeStoppages from "./pages_old/PtoOperativeStoppages";
import PtoErrorsAsd from "./pages_old/PtoErrorsAsd";
import PtoNormTrips from "./pages_old/PtoNormTrips";
import PtoAnalyticTech from "./pages/TargetMonitoringWeightLoads";
import PtoOperuchet from "./pages_old/PtoOperuchet";

// atc
import AtcVehStoppages from "./pages_old/AtcVehStoppages";

// events
import EventsDumptrucks from "./pages_old/EventsDumptrucks";
import EventsDrainage from "./pages_old/EventsDrainage";
import EventsShovels from "./pages_old/EventsShovels";

// events
import LoginPage from "./pages_old/LoginPage";

// target
import TargetMonitoringWeightLoads from "./pages/TargetMonitoringWeightLoads";
import TargetReportWeightLoads from "./pages/TargetReportWeightLoads";
import TargetReportAvgSpeed from "./pages/TargetReportAvgSpeed";

// stoppages
import StoppagesReportAuxDvs from "./pages/StoppagesReportAuxDvs";
import StoppagesReportVehDvs from "./pages/StoppagesReportVehDvs";

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
        {/* target */}
        <Route
          path="/target/monitoring/weight_loads"
          element={<TargetMonitoringWeightLoads />}
        ></Route>
        <Route
          path="/target/report/weight_loads"
          element={<TargetReportWeightLoads />}
        ></Route>
        <Route
          path="/target/monitoring/avg_speed"
          element={<TargetReportAvgSpeed />}
        ></Route>
        <Route
          path="/target/report/avg_speed"
          element={<TargetReportAvgSpeed />}
        ></Route>
        {/* stoppages */}
        <Route
          path="/stoppages/report/aux_dvs"
          element={<StoppagesReportAuxDvs />}
        ></Route>
        <Route
          path="/stoppages/report/veh_dvs"
          element={<StoppagesReportVehDvs />}
        ></Route>
        {/* old */}
        {/* old */}
        {/* old */}
        {/* pto */}
        <Route path="/pto/time_to_load" element={<PtoTimeToLoad />}></Route>
        <Route
          path="/pto/operative_stoppages"
          element={<PtoOperativeStoppages />}
        ></Route>
        <Route path="/pto/errors_asd" element={<PtoErrorsAsd />}></Route>
        <Route path="/pto/normtrips" element={<PtoNormTrips />}></Route>
        <Route path="/pto/operuchet" element={<PtoOperuchet />}></Route>
        {/* atc */}
        <Route path="/atc/veh_stoppages" element={<AtcVehStoppages />}></Route>
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
