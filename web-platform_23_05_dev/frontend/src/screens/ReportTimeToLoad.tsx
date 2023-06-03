// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import axios from "axios";

// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////

import * as base from "../components/ui/base";
import * as hooks from "../components/hooks";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function Page(): JSX.Element {
  function format_date() {
    let d = new Date();
    let dd = d.getDate();
    // @ts-ignore
    dd = dd < 10 ? "0" + dd : dd;
    let mm = d.getMonth() + 1;
    // @ts-ignore
    mm = mm < 10 ? "0" + mm : mm;
    let yyyy = d.getFullYear();
    // @ts-ignore
    // let ret = yyyy + "-" + mm + "-" + dd;
    let ret = `${yyyy}-${mm}-${dd}`;

    return ret;
  }

  const [getterFormObj, setterFormObj] = useState({
    dateFrom: format_date(),
    shiftFrom: 1,
    dateTo: format_date(),
    shiftTo: 2,
    selectTechId: "Все",
    target: "15",
  });

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
        url: `reports/time_wait_to_load/?date=${getterFormObj.dateFrom}&shift=${getterFormObj.shiftFrom}&selectTechId=${getterFormObj.selectTechId}&target=${getterFormObj.target}`,
        method: `GET`,
        timeout: 30000,
        headers: {
          Authorization: `;`,
        },
        data: {},
      };
      const response = await axios(config);

      console.log("response: ", response);

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
    // setTimeout(async () => {
    //   setCurrentTime(Date().toString());
    // }, 10000);
  }

  useEffect(() => {
    // GetMonitoringData();
  }, [currentTime]);

  function getNormalTime(time: string) {
    return `${time.split("T")[0]} ${time.split("T")[1].split("+")[0]}`;
  }

  // TODO return ///////////////////////////////////////////////////////////////////////////////////////////////////////
  // @ts-ignore
  return (
    <base.Base1
      title={"Отчёты: Анализ времени ожидания на погрузку автосамосвалов"}
      description={
        "на этой странице можно выгрузить отчёт по ожиданию времени на погрузку"
      }
    >
      <div className={"lead tex-danger fw-bold display-6"}>
        {currentTime && currentTime.length > 0 && currentTime.split(" G")[0]}
      </div>
      <div>
        <div className={"input-group w-100 shadow p-3 w-25"}>
          <span className={"p-3"}>Выберите дату: </span>
          <input
            type={"date"}
            className={"form-control"}
            value={getterFormObj.dateFrom}
            onChange={(event) =>
              setterFormObj({
                ...getterFormObj,
                // @ts-ignore
                dateFrom: event.target.value,
              })
            }
          />
          <span className={"p-3"}>Выберите смену: </span>
          <select
            className="form-select form-select-sm mb-3"
            defaultValue={getterFormObj.shiftFrom}
            onChange={(event) =>
              setterFormObj({
                ...getterFormObj,
                // @ts-ignore
                shiftFrom: event.target.value,
              })
            }
          >
            <option selected value={1}>
              1
            </option>
            <option value={2}>2</option>
          </select>
          <span className={"p-3"}>Выберите границу времени: </span>
          <select
            className="form-select form-select-sm mb-3"
            defaultValue={getterFormObj.target}
            onChange={(event) =>
              setterFormObj({
                ...getterFormObj,
                // @ts-ignore
                target: event.target.value,
              })
            }
          >
            <option value={"5"}>5</option>
            <option value={"10"}>
              10
            </option>
            <option value={"13"}>13</option>
            <option selected value={"15"}>15</option>
            <option value={"20"}>20</option>
          </select>
          <button
            onClick={GetMonitoringData}
            className={"btn btn-lg btn-primary w-25"}
          >
            обновить данные
          </button>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-sm-1 row-cols-md-1 row-cols-lg-1 text-center m-0 p-0">
        {monitoring && monitoring.data ? (
          <div className={"card col border border-1 border-dark m-0 p-0"}>
            <div className={"card-header lead display-6 m-0 p-3"}>
              <div className={"display-6 p-3"}>
                {monitoring && monitoring.query ? (
                  <div>
                    {monitoring.query.date.split("T")[0]} |{" "}
                    {monitoring.query.shift} смена
                    <p>{monitoring.query.name}</p>
                  </div>
                ) : (
                  "--:--:--"
                )}
              </div>
            </div>
            <div className="card-header lead m-0 p-3">
              <table className="table table-light table-hover table-striped m-0 p-0">
                <thead>
                <tr>
                  <th scope="col">Общее время ожидания под погрузку:</th>
                  <th scope="col">Среднее время ожидания под погрузку (только рейсы с ожиданием выше 2 минут)</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td className={monitoring.idle.sum_idles > 1500 ? "text-danger" : ""}>{monitoring.idle.sum_idles}</td>
                  <td className={monitoring.idle.avg_wait > 4.5 ? "text-danger" : ""}>{monitoring.idle.avg_wait}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div className={"card-body m-0 p-0"}>
              <table className="table table-light table-hover table-striped m-0 p-0">
                <thead>
                  <tr>
                    <th scope="col">Хоз. номер: </th>
                    <th scope="col">Время начала простоя</th>
                    <th scope="col">Время окончания простоя</th>
                    <th scope="col">Время простоя, минуты</th>
                  </tr>
                </thead>
                <tbody>
                  {monitoring.data.map(
                    // @ts-ignore
                    (item1, index1) => (
                      <tr>
                        <td>{item1.vehid}</td>
                        <td>
                          {item1.timeFrom.split("T")[0]}{" "}
                          {item1.timeFrom.split("T")[1].split(".")[0]}
                        </td>
                        <td>
                          {item1.timeTo.split("T")[0]}{" "}
                          {item1.timeTo.split("T")[1].split(".")[0]}
                        </td>
                        <td>{item1.time}</td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
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
