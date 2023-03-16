import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./AppNew";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import axios from "axios";

// axios.defaults.baseURL = "http://127.0.0.1:8000";
// axios.defaults.headers.common = {
//   ...axios.defaults.headers.common,
//   "Access-Control-Allow-Origin": "http://127.0.0.1:3000",
// };

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  //<React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  //</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
