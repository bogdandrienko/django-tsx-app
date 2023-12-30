// TODO download modules /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from "./components/store";

// TODO custom modules ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import * as constants from "./components/constants";

// base
import HomePage from "./pages/BaseHome";

// centr
import CentrMonitoring from "./pages/CentrMonitoring";

// events
import EventsDrainage from "./pages/EventsMonitoringDrainage";
import EventsDumptrucks from "./pages/EventsMonitoringDumptrucks";

// speed
import SpeedMonitoringDumptrucks from "./pages/SpeedMonitoringDumptrucks";
import SpeedReportDumptrucks from "./pages/SpeedReportDumptrucks";

// stoppages
import StoppagesReportAuxDvs from "./pages/StoppagesReportAuxDvs";
import StoppagesReportDumptruckDvs from "./pages/StoppagesReportDumptruckDvs";
import EmptyPeregonReportDumptrucks from "./pages/StoppagesReportEmptyPeregonDumptrucks";

// pto
import PtoMonitoringNormTrips from "./pages/PtoMonitoringNormTrips";
import PtoReportAsdErrors from "./pages/PtoReportAsdErrors";
import PtoReportSticking from "./pages/PtoReportSticking";
import PtoMonitoringOperStoppages from "./pages/PtoMonitoringOperStoppages";
import PtoReportTimeToLoad from "./pages/PtoReportTimeToLoad";

// css
import "./css/bootstrap/bootstrap.css";
import "./css/font_awesome/css/all.min.css";
import "./css/my.css";

// gto
import GtoReportDumptrucks from "./pages/GtoReportDumptrucks";

// develop
import LoadingMonitoringShovels from "./pages/LoadingMonitoringShovels";
import TargetReportWeightLoads from "./pages/LoadingReportWeightLoads";
import AnalyticMonitoringTech from "./pages/AnalyticMonitoringTech";

// TODO export ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      {constants.IS_CENTR_MONITORING ? (
        <Routes>
          {/* TODO centr ///////////////////////////////////////////////////// */}
          <Route path="*" element={<CentrMonitoring />}></Route>
          {/* TODO centr ///////////////////////////////////////////////////// */}
        </Routes>
      ) : (
        <Routes>
          {/* TODO base ////////////////////////////////////////////////////// */}
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          {/* TODO base ////////////////////////////////////////////////////// */}

          {/* TODO events //////////////////////////////////////////////////// */}
          <Route path="/events/drainage" element={<EventsDrainage />}></Route>
          <Route
            path="/events/dumptrucks"
            element={<EventsDumptrucks />}
          ></Route>
          {/* TODO events //////////////////////////////////////////////////// */}

          {/* TODO speed ///////////////////////////////////////////////////// */}
          <Route
            path="/speed/monitoring/dumptrucks"
            element={<SpeedMonitoringDumptrucks />}
          ></Route>
          <Route
            path="/speed/report/dumptrucks"
            element={<SpeedReportDumptrucks />}
          ></Route>
          {/* TODO speed ///////////////////////////////////////////////////// */}

          {/* TODO pto /////////////////////////////////////////////////////// */}
          <Route
            path="/pto/monitoring/normtrips"
            element={<PtoMonitoringNormTrips />}
          ></Route>
          <Route
            path="/pto/report/asd_errors"
            element={<PtoReportAsdErrors />}
          ></Route>
          <Route
            path="/pto/monitoring/oper_stoppages"
            element={<PtoMonitoringOperStoppages />}
          ></Route>
          <Route
            path="/pto/report/time_to_load"
            element={<PtoReportTimeToLoad />}
          ></Route>
          <Route
            path="/pto/report/sticking"
            element={<PtoReportSticking />}
          ></Route>
          {/* TODO pto /////////////////////////////////////////////////////// */}

          {/* TODO stoppages ///////////////////////////////////////////////// */}
          <Route
            path="/stoppages/report/empty_peregon/dumptrucks"
            element={<EmptyPeregonReportDumptrucks />}
          ></Route>
          <Route
            path="/stoppages/report/aux_dvs"
            element={<StoppagesReportAuxDvs />}
          ></Route>
          <Route
            path="/stoppages/report/dumptruck_dvs"
            element={<StoppagesReportDumptruckDvs />}
          ></Route>
          <Route
            path="/stoppages/report/dumptruck_dvs"
            element={<StoppagesReportDumptruckDvs />}
          ></Route>
          {/* TODO stoppages ///////////////////////////////////////////////// */}

          {/* TODO gto /////////////////////////////////////////////////////// */}
          <Route
            path="/gto/report/dumptrucks"
            element={<GtoReportDumptrucks />}
          ></Route>
          {/* TODO gto /////////////////////////////////////////////////////// */}

          {/* TODO develop /////////////////////////////////////////////////// */}
          <Route
            path="/loading/monitoring/shovels"
            element={<LoadingMonitoringShovels />}
          ></Route>
          <Route
            path="/target/report/weight_loads"
            element={<TargetReportWeightLoads />}
          ></Route>
          <Route
            path="/analytic/monitoring/tech"
            element={<AnalyticMonitoringTech />}
          ></Route>
          {/* TODO develop /////////////////////////////////////////////////// */}

          {/* TODO old /////////////////////////////////////////////////////// */}
          {/*<Route path="/events/auxes" element={<EventsAuxes />}></Route>*/}
          {/*<Route path="/" element={<HomePage />}></Route>*/}
          {/*<Route path="/login" element={<LoginPage />}></Route>*/}
          {/*<Route path="/logout" element={<LogoutPage />}></Route>*/}
          {/*<Route path="/register" element={<RegisterPage />}></Route>*/}
          {/*<Route path="/tasks" element={<TaskListPage />}></Route>*/}
          {/*<Route path="/tasks/:id" element={<TaskPage />}></Route>*/}
          {/*<Route path="/tasks/create" element={<TaskCreatePage />}></Route>*/}
          {/*<Route path="/tasks/update/:id" element={<TaskChangePage />}></Route>*/}
          {/* TODO old /////////////////////////////////////////////////////// */}
        </Routes>
      )}
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
