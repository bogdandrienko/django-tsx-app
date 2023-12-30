// TODO download modules /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// TODO custom modules ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// css
import "./css/bootstrap/bootstrap.css";
import "./css/font_awesome/css/all.css";
import "./css/my.css";

import { store } from "./components/store";
import { routes } from "./components/routes";

// TODO export ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        {routes &&
          Object.entries(routes).length > 0 &&
          Object.entries(routes).map(([k, v]: any) => (
            <Route key={v.path} path={v.path} element={v.element}></Route>
          ))}
      </Routes>
    </BrowserRouter>
  </Provider>,
  // </React.StrictMode>
);
