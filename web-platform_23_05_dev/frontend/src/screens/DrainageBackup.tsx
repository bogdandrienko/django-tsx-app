// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import axios from "axios";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/base";
import * as hooks from "../components/hooks";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {



  const [minVal, setMinVal] = useState(180);
  const [timeDiff, setTimeDiff] = useState(15);
  const [danger, setDanger] = useState(false);

  const [monitoring, setMonitoring, resetMonitoring] = hooks.useStateCustom1(
    {}
  );
  const [currentTime, setCurrentTime, resetCurrentTime] = hooks.useStateCustom1(
    // @ts-ignore
    Date().toString()
  );
  async function GetMonitoringData() {
    try {
      const config = {
        url: `events/drainage/?timeDiff=${timeDiff}`,
        method: `GET`,
        timeout: 5000,
        headers: {
          Authorization: `;`,
        },
        data: {},
      };
      const response = await axios(config);
      if (response.status === 200) {
        if (
          response.data &&
          response.data.response &&
          response.data.response.data
        ) {
          setMonitoring(response.data.response);
          setDanger(false);
        } else {
          setDanger(true);
        }
      } else {
        setDanger(true);
      }
    } catch (error) {
      setDanger(true);
    }
    setTimeout(async () => {
      setCurrentTime(Date().toString());
    }, 10000);
  }

  useEffect(() => {
    GetMonitoringData();
  }, [currentTime]);

  function getNormalTime(time: string) {
    return `${time.split("T")[0]} ${time.split("T")[1].split("+")[0]}`;
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <base.Base1
      title={"Анализ производительности водоотлива"}
      description={
        "на этой странице автоматически происходит обновление показателей с водоотлива"
      }
    >
      <div className={"lead tex-danger fw-bold display-6"}>
        {currentTime && currentTime.length > 0 && currentTime.split(" G")[0]}
      </div>
      <div>
        <div className={"input-group w-100 shadow p-3"}>
          <span>Выберите минимальный уровень производительности: </span>
          <select
            onClick={
              // @ts-ignore
              (event) => setMinVal(event.target.value)
            }
            className="form-select w-25 form-select-lg mb-3"
          >
            <option value={30}>30</option>
            <option value={120}>120</option>
            <option value={150}>150</option>
            <option value={160}>160</option>
            <option value={170}>170</option>
            <option selected value={180}>
              180
            </option>
            <option value={210}>210</option>
            <option value={240}>240</option>
            <option value={270}>270</option>
            <option value={300}>300</option>
            <option value={330}>330</option>
            <option value={360}>360</option>
          </select>
          <span>Выберите разницу времени, минут: </span>
          <select
            onClick={
              // @ts-ignore
              (event) => setTimeDiff(event.target.value)
            }
            className="form-select w-25 form-select-lg mb-3"
          >
            <option value={5}>5</option>
            <option selected value={10}>
              10
            </option>
            <option value={15}>15</option>
            <option value={30}>30</option>
            <option value={60}>60</option>
            <option value={120}>120</option>
            <option value={1240}>1240</option>
          </select>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 text-center m-0 p-0">
        {monitoring && monitoring.data ? (
          <div className={"card col border border-1 border-dark m-0 p-0"}>
            <div className={"card-header lead fw-bold m-0 p-0"}>
              <img
                src={"/static/img/водоотлив.jpg"}
                className={"p-1"}
                height={"250"}
                alt={"image"}
              />
            </div>
            <div className={"card-body m-0 p-0"}>
              <table className="table table-light table-hover table-striped m-0 p-0">
                <thead>
                  <tr>
                    <th scope="col">Время: </th>
                    <th scope="col">Объём:</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{getNormalTime(monitoring.data.maxtime)}</td>
                    <td>{monitoring.data.maxfuel}</td>
                  </tr>
                  <tr>
                    <td>{getNormalTime(monitoring.data.mintime)}</td>
                    <td>{monitoring.data.minfuel}</td>
                  </tr>
                  <tr>
                    <td>
                      <hr />
                    </td>
                    <td>
                      <hr />
                    </td>
                  </tr>
                  <tr>
                    <td>Разница: {monitoring.data.diffuel}</td>
                    <td>
                      Производительность:{" "}
                      {monitoring.data.difval < minVal ? (
                        <span className={"text-danger lead fw-bold m-0 p-0"}>
                          {monitoring.data.difval}
                        </span>
                      ) : monitoring.data.difval - 20 < minVal ? (
                        <span className={"text-warning lead fw-bold m-0 p-0"}>
                          {monitoring.data.difval}
                        </span>
                      ) : (
                        <span className={"text-success lead fw-bold m-0 p-0"}>
                          {monitoring.data.difval}
                        </span>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className={"card-footer text-end m-0 p-1"}>
              {monitoring.data.difval < minVal && (
                <div className={"display-1 text-center text-danger"}>
                  ВНИМАНИЕ ПРОИЗВОДИТЕЛЬНОСТЬ!
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={"display-1 text-center text-danger"}>ДАННЫХ НЕТ!</div>
        )}
        {danger && (
          <div className={"display-1 text-center text-danger"}>
            ВНИМАНИЕ СВЯЗЬ!
          </div>
        )}
      </div>
    </base.Base1>
  );
}
