// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { MouseEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../../components/ui/base";
import * as component from "../../components/ui/component";
import * as hook from "../../components/hook";
import axios from "axios";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page() {
  const [monitoring, setMonitoring, resetMonitoring] = hook.useStateCustom1([]);
  const [currentTime, setCurrentTime, resetCurrentTime] = hook.useStateCustom1(
    // @ts-ignore
    Date().toString()
  );
  async function GetMonitoringData() {
    const action = "monitoring";
    const token =
      "pbkdf2_sha256$390000$aWV2vUbGxC6OYns3ZQw5q5$WqX/DUYyjIjA7X42p/paeS9gYlGd3dQsGk+ZUaxdB6Y=";
    const formData = new FormData();
    const config = {
      url: `api/vehtrips/status/`,
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
    console.log(monitoring);
  }, [monitoring]);

  useEffect(() => {
    GetMonitoring();
  }, []);

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <base.Base9
      title={"Предиктивный анализ"}
      description={"Предиктивный анализ"}
      is_hide_navbar={true}
    >
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
                  className={"card col border border-1 border-dark"}
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
                    вес:{" "}
                    {item.weight > 92 ? (
                      <span className={"text-danger m-0 p-0"}>
                        {item.weight}
                      </span>
                    ) : (
                      item.weight
                    )}{" "}
                    скорость:{" "}
                    {item.speed > 20 ? (
                      <span className={"text-danger m-0 p-0"}>
                        {item.speed}
                      </span>
                    ) : (
                      item.speed
                    )}{" "}
                    топливо: {item.fuel}
                  </div>
                  <div className={"card-footer m-0 p-0"}>
                    время: {item.time.split("T")[0]} {item.time.split("T")[1]}
                  </div>
                </div>
              )
            )
          : "данных нет"}
      </div>
    </base.Base9>
  );
}
