import React, { FormEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import * as accordeons from "../components/accordeon";
import { Accordeon1 } from "../components/accordeon";

const data = {
  user: "Bogdan",
};

export default function Page() {
  // TODO тут логика (js)
  //

  //     [getter, setter]
  const [value1, setValue1] = useState(12);
  const [token, setToken] = useState("");
  const [page, setPage] = useState(1);
  const [image, setImage] = useState(null);
  const [results, setResults] = useState([]);
  const [user, setUser] = useState({ username: "", password: "", email: "" });
  const value = 12;

  // @ts-ignore
  function sumValue(arg1, arg2) {
    return arg1 + arg2;
  }

  function getData() {
    axios
      .get(`/api/user/1/`, { params: { page: page } })
      .then((response) => {
        // TODO вызов при успешном запросе [200, 201, 204, ]
        console.log("success: ", response.data.response.result);
      })
      .catch((error) => {
        // TODO вызов при ошибке запроса
        console.log("error: ", error);
      })
      .finally(() => {
        // TODO вызов всегда
      });
  }

  async function getAllData() {
    try {
      const config = {
        url: `/api/result/?page=${page}`,
        method: "GET",
        timeout: 5000,
        data: {},
      };
      const response = await axios(config);
      // if (response.status >= 204 && response.status < 300) {
      // } else {
      //
      // }
      if (response.data.response) {
        setResults(response.data.response);
        console.log("response: ", response.data.response);
      } else {
        console.log("error: ", response);
      }
    } catch (fail) {
      console.log("fail: ", fail);
    }
  }

  function postData() {
    axios
      .post(`/api/user/`, {
        username: user.username,
        password: user.password,
      })
      .then((response) => {
        console.log("success: ", response.data.response);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  }

  async function postImage() {
    const form = new FormData();
    // @ts-ignore
    form.append("image", image);
    const config = {
      url: `/api/user/?action=setAvatar`,
      method: "POST",
      timeout: 5000,
      // data: { image: image },
      data: form,
    };
    const response = await axios(config);
    if (response.data.response) {
      console.log("response: ", response.data.response);
    } else {
      console.log("error: ", response);
    }
  }

  async function getToken() {
    const config = {
      url: `/api/token_jwt/`,
      method: "POST",
      timeout: 3000,
      data: { username: "user", password: "Qwerty!12345" },
    };
    const response = await axios(config);
    if (response.data) {
      console.log("response: ", response.data);
      setToken(response.data.access);
      localStorage.setItem("token_jwt", response.data.access);
    } else {
      console.log("error: ", response);
    }
  }

  async function getAllUsers() {
    const config = {
      url: `/api/get_all_users/`,
      method: "GET",
      timeout: 3000,
      data: {},
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios(config);
    if (response.data) {
      console.log("response: ", response.data);
    } else {
      console.log("error: ", response);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token_jwt")
      ? localStorage.getItem("token_jwt")
      : "no token";
    // @ts-ignore
    setToken(token);
  }, []);

  // TODO тут логика (js)
  // @ts-ignore
  return (
    // TODO тут отображение (html + css)
    <accordeons.Base1>
      <div className="App">
        <header className="App-header">
          <div
            className={
              "container container-fluid m-5 border border-1 border-dark"
            }
          >
            <h2 className={"lead"}>
              token:{" "}
              <small>{token.length < 1 ? "токен не получен" : token}</small>
            </h2>
            <div className={"btn-group"}>
              <button
                className={"btn btn-lg btn-outline-primary"}
                onClick={getToken}
              >
                getToken
              </button>
              <button
                className={"btn btn-lg btn-outline-danger"}
                onClick={getAllUsers}
              >
                getAllUsers
              </button>
            </div>
          </div>
          <h1>Home page</h1>
          <Link to="/login">go</Link>
          <accordeons.Accordeon1 value={"666"}>111</accordeons.Accordeon1>
          {value}
          <div>
            <h1>value1: {value1}</h1>
            {/*// TODO односторонняя связь*/}
            <input
              type="number"
              onChange={(event) => setValue1(parseInt(event.target.value))}
            />
            {/*// TODO двухсторонняя связь*/}
            <input
              type="number"
              value={value1}
              onChange={(event) => setValue1(parseInt(event.target.value))}
            />
            <button onClick={() => setValue1(sumValue(value1, value1))}>
              double
            </button>
            <button onClick={getData}>getData</button>
            <div>
              <form
                onSubmit={(event) => {
                  event.preventDefault(); // TODO запрещает форме стандартное поведение (перезагрузку страницы)
                  postData();
                }}
              >
                <input
                  type="text"
                  value={user.username}
                  onChange={(event) =>
                    setUser({
                      ...user, // { username: user.username, password: user.password, email: user.email }
                      username: event.target.value,
                    })
                  }
                  minLength={5}
                  maxLength={64}
                  required
                />
                <input
                  type="password"
                  value={user.password}
                  onChange={(event) =>
                    setUser({
                      username: user.username,
                      password: event.target.value,
                      email: user.email,
                    })
                  }
                  minLength={8}
                  maxLength={16}
                  required
                />
                <button type="submit">postData</button>
              </form>
            </div>
            <div>
              <div>
                <ul>
                  {results.map((item, index) => (
                    // @ts-ignore
                    <li key={index}>{item.title}</li>
                  ))}
                </ul>
              </div>
              <div>
                {12 > 10 && "Правда 1"}
                {12 < 10 ? "Правда 2" : "Ложь 2"}
                {results.length < 1
                  ? "Данные не получены!"
                  : results.length > 5
                  ? "111"
                  : "222"}
                <table
                  className={"border border-1 border-dark table table-striped"}
                >
                  <thead>
                    <tr>
                      <td className="m-1 p-1">id</td>
                      <td className="m-1 p-1">title</td>
                      <td className="m-1 p-1">is_pay</td>
                      <td className="m-1 p-1">user</td>
                    </tr>
                  </thead>
                  <tbody>
                    {results.map((item, index) => (
                      <tr key={index}>
                        <td
                          className={
                            // @ts-ignore
                            item.id % 2 == 0 ? "text-success" : "text-danger"
                          }
                        >
                          {
                            // @ts-ignore
                            item.id
                          }
                        </td>
                        <td>
                          {
                            // @ts-ignore
                            item.title
                          }
                        </td>
                        <td>
                          {
                            // @ts-ignore
                            item.is_pay
                          }
                        </td>
                        <td>
                          {
                            // @ts-ignore
                            item.user
                          }
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                <ul>
                  {results.map((item, index) => (
                    // @ts-ignore
                    <li key={index}>{item.title}</li>
                  ))}
                </ul>
              </div>
              <input
                type="number"
                value={page}
                onChange={(event) => setPage(parseInt(event.target.value))}
              />
              <button
                // @ts-ignore
                onClick={getAllData}
              >
                getAllData
              </button>
            </div>
            <div>
              <input
                type="file"
                accept=".jpg, .png"
                onChange={(event) =>
                  // @ts-ignore
                  setImage(event.target.files[0])
                }
              />
              <button
                // @ts-ignore
                onClick={postImage}
              >
                postImage
              </button>
            </div>
          </div>
        </header>
      </div>
    </accordeons.Base1>
    // TODO тут отображение (html + css)
  );
}

export function Page1() {
  // TODO тут логика (js)
  //
  // TODO тут логика (js)
  return (
    // TODO тут отображение (html + css)
    <div className="App">
      <header className="App-header">
        <h1>Home page</h1>
        <a href="/login">go</a>
      </header>
    </div>
    // TODO тут отображение (html + css)
  );
}
