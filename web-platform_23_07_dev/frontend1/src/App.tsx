import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  async function Register() {
    try {
      // const form = new FormData();
      // form.append("username", "admin");
      // form.append("password", "admin123");
      // const response = await axios.post(
      //   "http://127.0.0.1:8000/api/token",
      //   form
      // );
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        email: "admin123@gmail.com",
        password: "Qwerty!12345",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  async function Login() {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: "admin123@gmail.com",
        password: "Qwerty!12345",
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function GetData() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/data1");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <button onClick={Register}>Register</button>
        <button onClick={Login}>Login</button>
        <button onClick={GetData}>GetData</button>

        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
