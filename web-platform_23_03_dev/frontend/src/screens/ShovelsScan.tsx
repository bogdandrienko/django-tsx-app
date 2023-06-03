// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect } from "react";
import axios from "axios";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/base";
import * as hooks from "../components/hooks";
import { Link } from "react-router-dom";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  const [monitoring, setMonitoring, resetMonitoring] = hooks.useStateCustom1(
    []
  );
  const [currentTime, setCurrentTime, resetCurrentTime] = hooks.useStateCustom1(
    // @ts-ignore
    Date().toString()
  );
  async function GetMonitoringData() {
    const action = "monitoring";
    const token =
      "pbkdf2_sha256$390000$aWV2vUbGxC6OYns3ZQw5q5$WqX/DUYyjIjA7X42p/paeS9gYlGd3dQsGk+ZUaxdB6Y=";
    const formData = new FormData();
    const config = {
      url: `api/shovels/eventstate/`,
      method: `GET`,
      timeout: 5000,
      headers: {
        Authorization: `action=${action};token=${token};`,
      },
      data: formData,
    };
    const response = await axios(config);
    setMonitoring(response.data.response);
    // @ts-ignore
    setCurrentTime(Date().toString());
  }

  async function GetMonitoring() {
    await GetMonitoringData();
    setTimeout(() => GetMonitoring(), 3000);
  }

  useEffect(() => {
    GetMonitoring();
  }, []);
  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <base.Base1
      title={"Анализ экскаваторов"}
      description={
        "на этой странице автоматически происходит обновление показателей с экскаваторов"
      }
    >
      <div className="px-1 pt-1 my-1 text-center border-bottom">
        <h1 className="display-4 fw-bold">Centered screenshot</h1>
        <div className="overflow-hidden">
          <div className="container px-5">
            <img
              src="/static/img/shov1.jpg"
              className="img-fluid border rounded-3 shadow-lg mb-4"
              alt="Example image"
              width="700"
              height="500"
              loading="lazy"
            />
          </div>
        </div>
        <div className="col-lg-6 mx-auto">
          <p className="lead mb-4">
            Quickly design and customize responsive mobile-first sites with
            Bootstrap, the world’s most popular front-end open source toolkit,
            featuring Sass variables and mixins, responsive grid system,
            extensive prebuilt components, and powerful JavaScript plugins.
          </p>
          <div className="d-grid gap-2 d-sm-flex justify-content-sm-center mb-5">
            <button
              type="button"
              className="btn btn-primary btn-lg px-4 me-sm-3"
            >
              Primary button
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary btn-lg px-4"
            >
              Secondary
            </button>
          </div>
        </div>
      </div>

      <div className={"lead tex-danger fw-bold display-6"}>
        {currentTime && currentTime.length > 0 && currentTime.split(" G")[0]}
      </div>
      <div className="row row-cols-3 row-cols-sm-1 row-cols-md-4 row-cols-lg-5 text-center m-0 p-0">
        {monitoring && monitoring.data && monitoring.data.length > 0
          ? monitoring.data.map(
              // @ts-ignore
              (item, index) => (
                <div
                  key={index}
                  className={"card col border border-1 border-dark m-0 p-0"}
                >
                  <div className={"card-header lead fw-bold m-0 p-0"}>
                    #{item.vehid}
                    <img
                      src={"/static/img/dumptruck2.png"}
                      className={"p-1"}
                      height={"50"}
                    />
                  </div>
                  <div className={"card-body m-0 p-0"}>
                    <table className="table table-light table-hover table-striped m-0 p-0">
                      <thead>
                        <tr>
                          <th scope="col">Скорость</th>
                          <th scope="col">Вес</th>
                          <th scope="col">Топливо</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            {item.speed > 25 ? (
                              <span className={"text-danger m-0 p-0"}>
                                {item.speed}
                              </span>
                            ) : item.speed < 15 && item.speed > 0 ? (
                              <span className={"text-warning m-0 p-0"}>
                                {item.speed}
                              </span>
                            ) : (
                              <span className={"text-secondary m-0 p-0"}>
                                {item.speed}
                              </span>
                            )}
                          </td>
                          <td>
                            {item.weight > 92 ? (
                              <span className={"text-danger m-0 p-0"}>
                                {item.weight}
                              </span>
                            ) : item.weight < 80 && item.weight > 2 ? (
                              <span className={"text-warning m-0 p-0"}>
                                {item.weight}
                              </span>
                            ) : (
                              <span className={"text-secondary m-0 p-0"}>
                                {item.weight}
                              </span>
                            )}
                          </td>
                          <td>
                            {item.fuel > 500 ? (
                              <span className={"text-success m-0 p-0"}>
                                {item.fuel}
                              </span>
                            ) : item.fuel < 200 && item.fuel > 50 ? (
                              <span className={"text-warning m-0 p-0"}>
                                {item.fuel}
                              </span>
                            ) : (
                              <span className={"text-secondary m-0 p-0"}>
                                {item.fuel}
                              </span>
                            )}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className={"card-footer text-end m-0 p-1"}>
                    {item.time.split("T")[0]}{" "}
                    {item.time.split("T")[1].split("+")[0]}
                  </div>
                </div>
              )
            )
          : "данных нет"}
      </div>
    </base.Base1>
  );
}
